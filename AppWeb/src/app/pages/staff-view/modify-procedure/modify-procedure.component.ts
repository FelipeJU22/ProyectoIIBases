import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-procedure',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './modify-procedure.component.html',
  styleUrl: './modify-procedure.component.scss'
})
export class ModifyProcedureComponent {
  @Input() procedureList: any[] = [];
  @Output() closeModal = new EventEmitter<string>();
  @Output() onModifyRoom = new EventEmitter<any>();

  selectedProcedure: any;
  modifyForm: FormGroup;
  view: 'list' | 'form' = 'list';

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.modifyForm = this.fb.group({
      name: [''],
      healingDays: ['']
    });
  }

  selectProcedure(procedure: any) {
    this.selectedProcedure = procedure;
    this.modifyForm.patchValue({
      name: procedure.nombre,
      healingDays: procedure.diasRecuperacion,
    });
    this.view = 'form';
  }

  getProcedure() {
    this._http.get(GlobalComponent.APIUrl + '/Procedimiento/GetAllProcedimientos').subscribe((data: any) => {
      this.procedureList = data;
      console.log('EqList: ', this.procedureList)
      console.log('Data: ', data)
    })
  }

  ModifyProcedure(formData: any) {
    console.log('DATA2SEND:', formData)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "nombre": formData.name,
      "diasRecuperacion": formData.healingDays,
    });
    this._http
      .put<any>(GlobalComponent.APIUrl + 'Procedimiento/ModificarProcedimiento', body, {
        headers: headers
      })
      .subscribe((res) => { console.log(res); this.getProcedure() });
    console.log('Body: ', body);
    console.log('Equipment Modified!');
  }

  submitModification() {
    if (this.modifyForm.valid) {
      //const modifiedRoom = { ...this.selectedRoom, ...this.modifyForm.value };
      //this.onModifyRoom.emit(modifiedRoom);
      console.log(this.modifyForm.value)
      this.ModifyProcedure(this.modifyForm.value)
      this.view = 'list';  // Go back to list view after submission
    }
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason);
  }

}
