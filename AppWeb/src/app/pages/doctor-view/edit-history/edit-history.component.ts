import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../../global-component';

@Component({
  selector: 'app-edit-history',
  standalone: true,
  imports: [NgbDatepickerModule, ReactiveFormsModule, CommonModule, NgbAccordionModule, HttpClientModule],
  templateUrl: './edit-history.component.html',
  styleUrl: './edit-history.component.scss'
})
export class EditHistoryComponent {
  formRG: FormGroup
  formRA: FormGroup;
  historyFound: boolean = false;
  history: any[] = [];
  sHistory: any;
  @Output() closeModal = new EventEmitter<string>();
  constructor(private fb: FormBuilder, private _http: HttpClient){
    this.formRG = this.fb.group({
      id:[''],
    })
    this.formRA = this.fb.group({
      date: [''],
      plan : this.fb.array([
        this.fb.group({
          procedure:[''],
          treatment:['']
        })
      ])
    });
  }
  searchHistory(){
    const formData = this.formRG.value;
    this._http.get(GlobalComponent.APIUrl + '/HistorialClinico/ObtenerHistorialCliente?cedula=' + formData.id).subscribe((data: any)=>{
      this.history = data;
      console.log(this.history);
    })
    this.historyFound = true;
  }
  modifyHistory(){

  }
  setSelected(date: string){
    this.sHistory = this.history.filter((sHistory: any)=> date === sHistory.fechaProcedimiento)[0];
    this.plan.clear()
    this.setDefaultValues();

  }
  setDefaultValues(){
    const selectedDate = this.sHistory.fechaProcedimiento;
    const splitedDate = selectedDate.split('-');
    const date: NgbDateStruct = { year: Number(splitedDate[0]), month: Number(splitedDate[1]), day: Number(splitedDate[2]) };
    this.formRA.patchValue({
      date: date,
    });
    let index = 0;
    for(let procedimiento of this.sHistory.procedimiento){
      const planGroup = this.fb.group({
        procedure:[procedimiento],
        treatment:[this.sHistory.tratamiento[index]]

      })
      console.log(procedimiento);
      console.log(this.sHistory.tratamiento[index])
      this.plan.push(planGroup);
      index ++;
    }
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
  editHistory(){
    const formDataRA = this.formRA.value;
    const formDataRG = this.formRG.value;
    const date = formDataRA.date;
    const id = formDataRG.id;
    const plan = formDataRA.plan;
    const procedures: string[] =[];
    const treatments: string[] =[];
    for(let item of plan){
      procedures.push(item.procedure)
      treatments.push(item.treatment)
    }
    let history = {
      cedulaPaciente: id,
      fechaProcediemiento: formDataRA.date.year+ '-' +  formDataRA.date.month+ '-' +  formDataRA.date.day,
      tratamiento: treatments,
      procedimiento: procedures,
    }
    if(procedures.length>0 && treatments.length>0){
      console.log(history);
    }
  }
}
