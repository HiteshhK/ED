import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNodeComponent } from './start-node.component';

describe('StartNodeComponent', () => {
  let component: StartNodeComponent;
  let fixture: ComponentFixture<StartNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
