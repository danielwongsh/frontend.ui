import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEventRegistrationComponent } from './post-event-registration.component';

describe('PostEventRegistrationComponent', () => {
  let component: PostEventRegistrationComponent;
  let fixture: ComponentFixture<PostEventRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostEventRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostEventRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
