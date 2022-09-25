import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainEventsComponent } from './maintain-events.component';

describe('MaintainEventsComponent', () => {
  let component: MaintainEventsComponent;
  let fixture: ComponentFixture<MaintainEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
