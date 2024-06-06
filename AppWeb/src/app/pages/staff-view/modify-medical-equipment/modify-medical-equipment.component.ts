import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-medical-equipment',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './modify-medical-equipment.component.html',
  styleUrl: './modify-medical-equipment.component.scss'
})
export class ModifyMedicalEquipmentComponent {
  @Input() medicalEqList: any[] = [];
  @Output() closeModal = new EventEmitter<string>();
  @Output() onModifyRoom = new EventEmitter<any>();

  selectedEquipment: any;
  modifyForm: FormGroup;
  view: 'list' | 'form' = 'list';

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.modifyForm = this.fb.group({
      name: [''],
      provider: [''],
      amount: [''],
    });
  }

  selectEquipment(equipment: any) {
    this.selectedEquipment = equipment;
    this.modifyForm.patchValue({
      name: equipment.nombre,
      provider: equipment.proveedor,
      amount: equipment.cantidad,
    });
    this.view = 'form';
  }

  getEquipment() {
    this._http.get(GlobalComponent.APIUrl + '/EquipoMedico/GetAllEquipos').subscribe((data: any) => {
      this.medicalEqList = data;
      console.log('EqList: ', this.medicalEqList)
      console.log('Data: ', data)
    })
  }

  ModifyEquipment(formData: any) {
    console.log('DATA2SEND:', formData)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "nombre": formData.name,
      "proveedor": formData.provider,
      "cantidad": formData.amount
    });
    this._http
      .put<any>(GlobalComponent.APIUrl + 'EquipoMedico/ModificarEquipoMedico', body, {
        headers: headers
      })
      .subscribe((res) => { console.log(res); this.getEquipment() });
    console.log('Body: ', body);
    console.log('Equipment Modified!');
  }

  submitModification() {
    if (this.modifyForm.valid) {
      //const modifiedRoom = { ...this.selectedRoom, ...this.modifyForm.value };
      //this.onModifyRoom.emit(modifiedRoom);
      console.log(this.modifyForm.value)
      this.ModifyEquipment(this.modifyForm.value)
      this.view = 'list';  // Go back to list view after submission
    }
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason);
  }

}
