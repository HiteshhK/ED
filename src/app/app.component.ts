import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { jsPlumbToolkitModule } from 'jsplumbtoolkit-angular';
import { Dialogs, jsPlumbToolkit, jsPlumbToolkitUtil, DrawingTools } from 'jsplumbtoolkit';
import { jsPlumbToolkitComponent } from "jsplumbtoolkit-angular";
import { ActionNodeComponent } from './action-node/action-node.component';
import { OutputNodeComponent } from './output-node/output-node.component';
import { QuestionNodeComponent } from './question-node/question-node.component';
import { StartNodeComponent } from './start-node/start-node.component';
import {json} from './dummyJSON';

declare var jsPlumb: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  toolkitParams: Object;
  view: Object;
  renderParams: Object;
  nodeTypes: any[] = [];
  nodeDimensions: Object;
  myData: any[] =[];
  @ViewChild(jsPlumbToolkitComponent) toolkitComponent: jsPlumbToolkitComponent;

  ngOnInit() {

    var _this = this;

    this.nodeTypes = [
      { label: "Question", type: "question" },
      { label: "Action", type: "action" },
      { label: "Output", type: "output" }
    ];

    this.nodeDimensions = {
      question: { w: 120, h: 120 },
      action: { w: 120, h: 70 },
      start: { w: 50, h: 50 },
      output: { w: 120, h: 70 }
    };

    this.toolkitParams = {
      nodeFactory: function (type, data, callback) {
        Dialogs.show({
          id: "dlgText",
          title: "Enter " + type + " name:",
          onOK: function (d) {
            data.text = d.text;
            // if the user entered a name...
            if (data.text) {
              // and it was at least 2 chars
              if (data.text.length >= 2) {
                // set width and height.
                jsPlumb.extend(data, _this.nodeDimensions[type]);
                // set an id and continue.
                data.id = jsPlumbToolkitUtil.uuid();
                callback(data);
              }
              else
                // else advise the user.
                alert(type + " names must be at least 2 characters!");
            }
            // else...do not proceed.
          }
        });
      },
      beforeStartConnect: function (node, edgeType) {
        return { label: "..." };
      }
    };

    this.view = {
      nodes: {
        "start": {
          template: "StartNode"
        },
        "selectable": {
          events: {
            tap: function (params) {
              _this.toggleSelection(params.node);
            }
          }
        },
        "question": {
          parent: "selectable",
          template: "QuestionNode"
        },
        "output": {
          parent: "selectable",
          template: "OutputNode"
        },
        "action": {
          parent: "selectable",
          template: "ActionNode"
        }
      },
      edges: {
        "default": {
          anchor: "AutoDefault",
          endpoint: "Blank",
          //connector: ["Flowchart", { cornerRadius: 5 }],
          connector: ["Straight", { cornerRadius: 5 }],
          paintStyle: { strokeWidth: 2, stroke: "#f76258", outlineWidth: 3, outlineStroke: "transparent" },
          hoverPaintStyle: { strokeWidth: 2, stroke: "rgb(67,67,67)" },
          events: {
            "dblclick": function (params) {
              Dialogs.show({
                id: "dlgConfirm",
                data: {
                  msg: "Delete Edge"
                },
                onOK: function () { _this.removeEdge(params.edge); }
              });
            }
          },
          overlays: [
            ["Arrow", { location: 1, width: 10, length: 10 }],
            ["Arrow", { location: 0.3, width: 10, length: 10 }]
          ]
        },
        "connection": {
          parent: "default",
          overlays: [
            [
              "Label", {
                label: "${label}",
                events: {
                  click: function (params) {
                    _this.editLabel(params.edge);
                  }
                }
              }
            ]
          ]
        }
      },
      ports: {
        "start": {
          endpoint: "Blank",
          anchor: "Continuous",
          uniqueEndpoint: true,
          edgeType: "default"
        },
        "source": {
          endpoint: "Blank",
          paintStyle: { fill: "#84acb3" },
          anchor: "AutoDefault",
          maxConnections: -1,
          edgeType: "connection"
        },
        "target": {
          maxConnections: -1,
          endpoint: "Blank",
          anchor: "AutoDefault",
          paintStyle: { fill: "#84acb3" },
          isTarget: true
        }
      }
    };

    this.renderParams = {
      layout: {
        type: "Spring"
      },
      events: {
        canvasClick: function (e) {
          _this.toolkitComponent.toolkit.clearSelection();
        },
        edgeAdded: function (params) {
          if (params.addedByMouse) {
            _this.editLabel(params.edge);
          }
        },
        modeChanged: function (mode) {
          var controls = document.querySelector(".controls");
          jsPlumb.removeClass(controls.querySelectorAll("[mode]"), "selected-mode");
          jsPlumb.addClass(controls.querySelectorAll("[mode='" + mode + "']"), "selected-mode");
        }
      },
      consumeRightClick: false,
      dragOptions: {
        filter: ".jtk-draw-handle, .node-action, .node-action i"
      }
    };

    // Getting JSON
    console.log('Orig Data: ', json);
    this.customData(json);
  }

  customData(json) {
    this.myData = [];
    this.myData['nodes'] = [];
    this.myData['edges'] = [];

    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        if (key === 'nodeInfo') {
          for (let i = 0 ; i < json['nodeInfo'].length ; i++) {
            // if (json['nodeInfo'][i].pvs === 0 || json['nodeInfo'][i].pvs === -1) {
            //   continue;
            // }
            let type = (json['nodeInfo'][i].entityType === 0) ? "action": "start";
            let width = (type === "action") ? 190: 180;
            this.myData['nodes'].push({
              "id":  json['nodeInfo'][i].name,
              "type": type,
              "text": json['nodeInfo'][i].name,
              "left": json['nodeInfo'][i].cordinate[1],
              "top": json['nodeInfo'][i].cordinate[0],
              "w": width,
              "h": 60
            });
          }

        } else if (key === 'callData') {
          for (let i = 0 ; i < json['callData'].length ; i++) {
            for (let j = 0 ; j < json['callData'][i]['backEnd'].length ; j++) { 
              if (json['callData'][i]['backEnd'][j].name) {
                this.myData['edges'].push({
                  "id": i+1,
                  "source": json['callData'][i].name,
                  "target": json['callData'][i]['backEnd'][j].name
                });
              }
            }
          }
        }
      }
    }
    console.log('My JSON : ', this.myData);
  }

  ngAfterViewInit() {
    const toolkit = this.toolkitComponent.toolkit;
    const surface = this.toolkitComponent.surface;

    const controls = document.querySelector(".controls");
    // pan mode/select mode
    jsPlumb.on(controls, "tap", "[mode]", function () {
      surface.setMode(this.getAttribute("mode"));
    });

    // on home button click, zoom content to fit.
    jsPlumb.on(controls, "tap", "[reset]", function () {
      toolkit.clearSelection();
      surface.zoomToFit();
    });

    // configure Drawing tools.
    new DrawingTools({
      renderer: surface
    });

    // ---------------- update data set -------------------------
    var _syntaxHighlight = function (json: string) {
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return "<pre>" + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }) + "</pre>";
    };

    toolkit.load({
      //url: "https://jsplumbtoolkit.com/data/flowchart-1.json",
      //data: {"nodes":[{"id":"start","type":"start","text":"Start","left":50,"top":50,"w":100,"h":70},{"id":"question1","type":"question","text":"Do Something?","left":290,"top":79,"w":150,"h":150},{"id":"varun","type":"question","text":"avein","left":590,"top":30,"w":150,"h":150}],"edges":[{"id":1,"source":"start","target":"question1"},{"id":1,"source":"varun","target":"start","data":{"label":"no","type":"connection"}}]},
      data: this.myData,
      onload: function () {
        surface.centerContent();
        surface.repaintEverything();
      }
    });
  }

  toggleSelection = function (node) {
    this.toolkitComponent.toolkit.toggleSelection(node);
  };

  nodeResolver(typeId: string) {
    return ({
      "QuestionNode": QuestionNodeComponent,
      "ActionNode": ActionNodeComponent,
      "StartNode": StartNodeComponent,
      "OutputNode": OutputNodeComponent
    })[typeId];
  };

  removeEdge = function (edge) {
    this.toolkitComponent.toolkit.removeEdge(edge);
  };

  editLabel = function (edge) {
    var _this = this;
    Dialogs.show({
      id: "dlgText",
      data: {
        text: edge.data.label || ""
      },
      onOK: function (data) {
        _this.toolkitComponent.toolkit.updateEdge(edge, { label: data.text });
      }
    });
  };

  typeExtractor = function (el) {
    return el.getAttribute("jtk-node-type");
  };


}
