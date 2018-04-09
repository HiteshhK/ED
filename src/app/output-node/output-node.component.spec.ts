import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputNodeComponent } from './output-node.component';

describe('OutputNodeComponent', () => {
  let component: OutputNodeComponent;
  let fixture: ComponentFixture<OutputNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
