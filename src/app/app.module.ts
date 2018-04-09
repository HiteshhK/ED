import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


// JS Plumb
import { jsPlumbToolkitModule } from 'jsplumbtoolkit-angular';
import { Dialogs } from 'jsplumbtoolkit';

// Components
import { AppComponent } from './app.component';
import { QuestionNodeComponent } from './question-node/question-node.component';
import { ActionNodeComponent } from './action-node/action-node.component';
import { StartNodeComponent } from './start-node/start-node.component';
import { OutputNodeComponent } from './output-node/output-node.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionNodeComponent,
    ActionNodeComponent,
    StartNodeComponent,
    OutputNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    jsPlumbToolkitModule
  ],
  providers: [],
  entryComponents: [QuestionNodeComponent, ActionNodeComponent, StartNodeComponent, OutputNodeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // initialize dialogs
    Dialogs.initialize({
      selector: '.dlg'
    });
  }
}
