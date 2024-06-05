import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SaveCredentialsPService } from '../../services/save-credentials-p.service';
import { ICredentialsP } from '../../models/credentialsP.model';

@Component({
  selector: 'app-add-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule, HttpClientModule],
  templateUrl: './add-history.component.html',
  styleUrl: './add-history.component.scss'
})
export class AddHistoryComponent {
  @Output() closeModal = new EventEmitter<string>();
  formRA: FormGroup;
  credentials: ICredentialsP;
  procedures: string[] = [];
  treatments: string[] = [];
  constructor(private fb: FormBuilder, private _http: HttpClient, private _credentialsPservice: SaveCredentialsPService){
    this.formRA = this.fb.group({
      date: [''],
      procedure: [''],
      treatment: [''],
    });
    this.credentials = this._credentialsPservice.getCredenciales();
  }
  addHistory(){
    const formData = this.formRA.value;
    const date = formData.date;
    this.procedures.push(formData.procedure);
    this.treatments.push(formData.treatment);
    let history = {
      cedulaPaciente: this.credentials.cedula,
      fechaProcedimiento: date.year + '-' + date.month + '-' + date.day,
      tratamiento: this.treatments,
      procedimiento: this.procedures,
    }
    console.log(history);
    this.closeModal.emit('Save click');
  }
}
