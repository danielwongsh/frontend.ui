import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainEvtRegComponent } from './maintain-evt-reg.component';

describe('MaintainEvtRegComponent', () => {
  let component: MaintainEvtRegComponent;
  let fixture: ComponentFixture<MaintainEvtRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainEvtRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainEvtRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
