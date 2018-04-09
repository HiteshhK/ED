import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionNodeComponent } from './action-node.component';

describe('ActionNodeComponent', () => {
  let component: ActionNodeComponent;
  let fixture: ComponentFixture<ActionNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
