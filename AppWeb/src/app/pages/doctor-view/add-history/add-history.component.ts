import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SaveCredentialsPService } from '../../../services/save-credentials-p.service';
import { ICredentialsP } from '../../../models/credentialsP.model';
import { GlobalComponent } from '../../../global-component';

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
      id: [''],
      date: [''],
      plan : this.fb.array([
        this.fb.group({
          procedure:[''],
          treatment:['']
        })
      ])
    });
    this.credentials = this._credentialsPservice.getCredenciales();
  }
  addHistory(){
    const formData = this.formRA.value;
    const date = formData.date;
    const procedures: string[] =[];
    const treatments: string[] =[];
    const plan = formData.plan;
    for(let item of plan){
      procedures.push(item.procedure)
      treatments.push(item.treatment)
    }
    let history = {
      cedulaPaciente: formData.id,
      fechaProcedimiento: date.year + '-' + date.month + '-' + date.day,
      tratamiento: treatments,
      procedimiento: procedures,
    }
    this._http.post(GlobalComponent.APIUrl + '/HistorialClinico/AñadirHistorialClinico', history).subscribe();
    console.log(history);
    this.closeModal.emit('Save click');
  }
  get plan(){
    return this.formRA.get('plan') as FormArray;
  }
  addPlan(){
    const planGroup = this.fb.group({
      procedure:[''],
      treatment:['']
    })
    this.plan.push(planGroup)
  }
  removePlan(index: number) {
    this.plan.removeAt(index);
  }
}
