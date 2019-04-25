import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerProjectComponent } from './partner-project.component';

describe('PartnerProjectComponent', () => {
  let component: PartnerProjectComponent;
  let fixture: ComponentFixture<PartnerProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
