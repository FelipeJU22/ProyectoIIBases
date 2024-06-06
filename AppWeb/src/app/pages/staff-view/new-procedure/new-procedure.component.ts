import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-procedure',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-procedure.component.html',
  styleUrl: './new-procedure.component.scss'
})
export class NewProcedureComponent {
  @Output() closeModal = new EventEmitter<string>();
  formNewProcedure: FormGroup;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.formNewProcedure = this.fb.group({
      name: [''],
      healingDays: ['']
    });
  }

  addProcedure() {
    console.log(this.formNewProcedure)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "nombre": this.formNewProcedure.get('name')?.value,
      "diasRecuperacion": this.formNewProcedure.get('healingDays')?.value
    });
    this._http
      .post<any>(GlobalComponent.APIUrl + '/Procedimiento/CrearProcedimiento', body, {
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
