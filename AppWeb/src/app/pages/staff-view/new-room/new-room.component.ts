import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProcedure } from '../../../models/procedure.model';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbDropdownModule
  ],
  templateUrl: './new-room.component.html',
  styleUrl: './new-room.component.scss'
})

export class NewRoomComponent {
  @Input() formNewRoom: FormGroup;
  @Output() closeModal = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.formNewRoom = this.fb.group({
      roomNumber: [''],
      roomName: [''],
      roomCapacity: [''],
      floor: [''],
      gender: ['']
    });
  }
  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason); // Emite el evento con el argumento 'Cross click'
  }

}
