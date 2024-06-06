import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProcedure } from '../../../models/procedure.model';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbDropdownModule,
    HttpClientModule
  ],
  templateUrl: './delete-room.component.html',
  styleUrl: './delete-room.component.scss'
})
export class DeleteRoomComponent {
  @Input() roomList: any[] = [];
  @Output() closeModal = new EventEmitter<string>();

  constructor(private _http: HttpClient) {
  }

  getRooms() {
    this._http.get(GlobalComponent.APIUrl + '/Salon/GetAllSalones').subscribe((data: any) => {
      console.log(data);
      this.roomList = data;
    })
  }

  deleteRoom(roomId: string) {
    this._http.delete(GlobalComponent.APIUrl + 'Salon/EliminarSalon?numeroSalon=' + roomId).subscribe((res) => {
      //this.closeModal.emit('Cross click');
      console.log(res);
      this.getRooms();
    });
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason); // Emite el evento con el argumento 'Cross click'
  }

  showList() {
    console.log('Here is list:', this.roomList)
    console.log('HELO')
  }
}
