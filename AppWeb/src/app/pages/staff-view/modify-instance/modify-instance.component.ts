import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-instance',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './modify-instance.component.html',
  styleUrl: './modify-instance.component.scss'
})
export class ModifyInstanceComponent {
  @Input() roomList: any[] = [];
  @Output() closeModal = new EventEmitter<string>();
  @Output() onModifyRoom = new EventEmitter<any>();

  selectedRoom: any;
  modifyForm: FormGroup;
  view: 'list' | 'form' = 'list';

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.modifyForm = this.fb.group({
      roomNumber: [''],
      roomName: [''],
      roomCapacity: [''],
      floor: [''],
      gender: ['']
    });
  }

  selectRoom(room: any) {
    this.selectedRoom = room;
    this.modifyForm.patchValue({
      roomNumber: room.numeroSalon,
      roomName: room.nombreSalon,
      roomCapacity: room.capacidad,
      floor: room.piso,
      gender: room.genero
    });
    this.view = 'form';
  }

  getRooms() {
    this._http.get(GlobalComponent.APIUrl + '/Salon/GetAllSalones').subscribe((data: any) => {
      console.log('Getting Rooms: ', data);
      this.roomList = data;
      console.log('RoomList: ', this.roomList)
      console.log('Data: ', data)
    })
  }

  ModifyRoom(formData: any) {
    console.log(formData)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "numeroSalon": formData.roomNumber,
      "nombreSalon": formData.roomName,
      "capacidad": formData.roomCapacity,
      "piso": formData.floor,
      "genero": formData.gender
    });
    this._http
      .put<any>(GlobalComponent.APIUrl + '/Salon/ModificarSalon', body, {
        headers: headers
      })
      .subscribe((res) => { console.log(res); this.getRooms() });
    console.log(body);
    console.log('Room Modified!');
  }

  submitModification() {
    if (this.modifyForm.valid) {
      //const modifiedRoom = { ...this.selectedRoom, ...this.modifyForm.value };
      //this.onModifyRoom.emit(modifiedRoom);
      console.log(this.modifyForm.value)
      this.ModifyRoom(this.modifyForm.value)
      this.view = 'list';  // Go back to list view after submission
    }
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason);
  }

}
