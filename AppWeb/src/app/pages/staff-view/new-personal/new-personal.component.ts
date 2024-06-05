import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDatepickerConfig, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-personal',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgbDatepickerModule
  ],
  templateUrl: './new-personal.component.html',
  styleUrl: './new-personal.component.scss'
})
export class NewPersonalComponent {
  @Output() closeModal = new EventEmitter<string>();
  formNewStaff: FormGroup;

  constructor(private fb: FormBuilder, private _http: HttpClient, private config: NgbDatepickerConfig) {
    this.formNewStaff = this.fb.group({
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

  addStaff() {
    console.log(this.formNewStaff)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "cedula": this.formNewStaff.get('id')?.value,
      "telefono": this.formNewStaff.get('phone')?.value,
      "nombre": this.formNewStaff.get('name')?.value,
      "apellido1": this.formNewStaff.get('lastname1')?.value,
      "apellido2": this.formNewStaff.get('lastname2')?.value,
      "direccion": this.formNewStaff.get('direction')?.value,
      "rol": this.formNewStaff.get('role')?.value,
      "fechaNacimiento": this.formatDate(this.formNewStaff.get('birthDate')?.value),
      "fechaIngreso": this.formatDate(this.formNewStaff.get('startDate')?.value),
      "contraseña": this.formNewStaff.get('password')?.value
    });
    this._http
      .post<any>(GlobalComponent.APIUrl + 'Personal/CrearPersonal', body, {
        headers: headers
      })
      .subscribe((res) => console.log(res));
    console.log(body);
    this.closeModal.emit('Cross click')
  }

  private formatDate(date: NgbDateStruct): string {
    return `${date.year}-${date.month}-${date.day}`;
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason); // Emite el evento con el argumento 'Cross click'
  }

}
