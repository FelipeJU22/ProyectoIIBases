import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-medical-equipment',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-medical-equipment.component.html',
  styleUrl: './new-medical-equipment.component.scss'
})
export class NewMedicalEquipmentComponent {
  @Output() closeModal = new EventEmitter<string>();
  formNewMedicalEq: FormGroup;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.formNewMedicalEq = this.fb.group({
      name: [''],
      provider: [''],
      amount: ['']
    });
  }

  addMedicalEq() {
    console.log(this.formNewMedicalEq)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "nombre": this.formNewMedicalEq.get('name')?.value,
      "proveedor": this.formNewMedicalEq.get('provider')?.value,
      "cantidad": this.formNewMedicalEq.get('amount')?.value
    });
    this._http
      .post<any>(GlobalComponent.APIUrl + '/EquipoMedico/CrearEquipoMedico', body, {
        headers: headers
      })
      .subscribe((res) => console.log(res));
    console.log(body);
    this.closeModal.emit('Cross click')
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason); // Emite el evento con el argumento 'Cross click'
  }

}
