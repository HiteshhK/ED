import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNodeComponent } from './question-node.component';

describe('QuestionNodeComponentComponent', () => {
  let component: QuestionNodeComponent;
  let fixture: ComponentFixture<QuestionNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
