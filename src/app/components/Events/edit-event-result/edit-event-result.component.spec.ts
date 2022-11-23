import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventResultComponent } from './edit-event-result.component';

describe('EditEventResultComponent', () => {
  let component: EditEventResultComponent;
  let fixture: ComponentFixture<EditEventResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
