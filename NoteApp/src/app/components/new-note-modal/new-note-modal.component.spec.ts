import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoteModalComponent } from './new-note-modal.component';

describe('EditNoteModalComponent', () => {
  let component: NewNoteModalComponent;
  let fixture: ComponentFixture<NewNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewNoteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
