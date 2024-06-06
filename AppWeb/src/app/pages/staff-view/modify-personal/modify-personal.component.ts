import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-personal',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './modify-personal.component.html',
  styleUrl: './modify-personal.component.scss'
})
export class ModifyPersonalComponent {
  @Input() staffList: any[] = [];
  @Output() closeModal = new EventEmitter<string>();
  @Output() onModifyRoom = new EventEmitter<any>();

  selectedMember: any;
  modifyForm: FormGroup;
  view: 'list' | 'form' = 'list';

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.modifyForm = this.fb.group({
      id: [''],
      phone: [''],
      name: [''],
      lastname1: [''],
      lastname2: [''],
      direction: [''],
      role: [''],
      birthDate: [''],
      startDate: [''],
      password: ['']
    });
  }

  selectMember(member: any) {
    this.selectedMember = member;
    this.modifyForm.patchValue({
      id: member.cedula,
      phone: member.telefono,
      name: member.nombre,
      lastname1: member.apellido1,
      lastname2: member.apellido2,
      direction: member.direccion,
      role: member.rol,
      birthDate: member.fechaNacimiento,
      startDate: member.fechaIngreso,
      password: member.contraseña,
    });
    this.view = 'form';
  }

  getStaff() {
    this._http.get(GlobalComponent.APIUrl + 'Personal/GetAllPersonal').subscribe((data: any) => {
      this.staffList = data;
      console.log('EqList: ', this.staffList)
      console.log('Data: ', data)
    })
  }

  ModifyStaff(formData: any) {
    console.log('DATA2SEND:', formData)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "cedula": formData.id,
      "telefono": formData.phone,
      "nombre": formData.name,
      "apellido1": formData.lastname1,
      "apellido2": formData.lastname2,
      "direccion": formData.direction,
      "rol": formData.role,
      "fechaNacimiento": formData.birthDate,
      "fechaIngreso": formData.startDate,
      "contraseña": formData.password
    });
    this._http
      .put<any>(GlobalComponent.APIUrl + 'Personal/ModificarPersonal', body, {
        headers: headers
      })
      .subscribe((res) => { console.log(res); this.getStaff() });
    console.log('Body: ', body);
    console.log('Equipment Modified!');
  }

  submitModification() {
    if (this.modifyForm.valid) {
      //const modifiedRoom = { ...this.selectedRoom, ...this.modifyForm.value };
      //this.onModifyRoom.emit(modifiedRoom);
      console.log(this.modifyForm.value)
      this.ModifyStaff(this.modifyForm.value)
      this.view = 'list';  // Go back to list view after submission
    }
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason);
  }
}
