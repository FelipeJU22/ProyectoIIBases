import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgbAccordionModule, NgbAlertModule, NgbDateStruct, NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../../global-component';
import { ReserveTableComponent } from '../reserve-table/reserve-table.component';
import { IProcedure } from '../../../models/procedure.model';
import { CommonModule } from '@angular/common';
import { SaveCredentialsPService } from '../../../services/save-credentials-p.service';
import { ICredentialsP } from '../../../models/credentialsP.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-show-tables',
  standalone: true,
  imports: [NgbAccordionModule, HttpClientModule, ReserveTableComponent,
    NgbDatepickerModule, ReactiveFormsModule, CommonModule, NgbDropdownModule, NgbAlertModule ],
  templateUrl: './show-tables.component.html',
  styleUrl: './show-tables.component.scss'
})
export class ShowTablesComponent {
  reservaciones:any[] = [];
  @Output() closeModal = new EventEmitter<string>();
  formRA: FormGroup;
  selectedReserve: any;
  selectedProcedures: string[] =[]
  procedures: IProcedure[] = [];
  totalDays=0;
  isOpen: boolean = false;
  credentials: ICredentialsP;
  error: boolean = false;
  constructor(private fb: FormBuilder ,private _http: HttpClient, private _credentialsPservice: SaveCredentialsPService, ){
    this.formRA = this.fb.group({
      startDate: [''],
      procedures: this.fb.array(['']),
    });
    this.credentials = this._credentialsPservice.getCredenciales();
  }
  ngOnInit(){
    this.getSelectedRfromDB();
    this.getSelectedPfromDB();
  }
  removeReserve(reserveID: string){
    console.log(reserveID);
    this._http.delete(GlobalComponent.APIUrl +  'Reservacion/EliminarReservacion?ID=' + reserveID ).subscribe();
    this.getSelectedRfromDB();
    console.log('Here');
  }
  setSelected(ID: number){

    if(this.isOpen){
      this.totalDays = 0;
      this.getSelectedRfromDB();
    }
    else{
      this.selectedReserve = this.reservaciones.filter((reservacion: any)=> reservacion.ID === ID)[0];
      this.selectedProcedures = this.selectedReserve.procedimientos;
      for(let selectedProcedure of this.selectedProcedures){
        for (let procedure of this.procedures){
          if(selectedProcedure === procedure.nombre){
            this.totalDays += procedure.diasRecuperacion;
          }
        }
      }
      this.setDefaultValues()
    }
    this.isOpen = !this.isOpen;


  }
  setDefaultValues(){
    const selectedDate = this.selectedReserve.fechaIngreso;
    const splitedDate = selectedDate.split('-');
    const date: NgbDateStruct = { year: Number(splitedDate[0]), month: Number(splitedDate[1]), day: Number(splitedDate[2]) };
    this.formRA.patchValue({
      startDate: date,
    });
  }
  removeProcedure(procedure: string){
    console.log(procedure)
    for(let procedureI of this.procedures){
      if(procedureI.nombre === procedure){
        this.totalDays -= procedureI.diasRecuperacion;
        break;
      }
    }
    this.selectedProcedures = this.selectedProcedures.filter((item :string)=> item !== procedure);
    console.log('Here')
  }
  addProcedure(selectedProcedure: string, time: number): void {
    for (let procedure of this.selectedProcedures) {
      if (selectedProcedure === procedure) {
        return;
      }
    }
    this.selectedProcedures.push(selectedProcedure);
    this.totalDays += time;
  }
  getSelectedPfromDB(){
    this._http.get(GlobalComponent.APIUrl + 'Procedimiento/GetAllProcedimientos').subscribe((data: any)=>{
      this.procedures = data;
    })
  }
  getSelectedRfromDB(){
    this._http.get(GlobalComponent.APIUrl + 'Reservacion/GetReservacionesCedula?cedula='+ 56789012).subscribe((data: any)=>{
      this.reservaciones = data;
      console.log(data);
    })
  }
  saveChanges(){
    const formData = this.formRA.value;
    const DateStartFormatted = new Date(formData.startDate.year, formData.startDate.month -1, formData.startDate.day);
    const finishDayFinal = this.sumarDias(DateStartFormatted, this.totalDays);
    const finishYear = finishDayFinal.getFullYear();
    const finishMonth = (finishDayFinal.getMonth() + 1).toString().padStart(2, '0');
    const finishDay = finishDayFinal.getDate().toString().padStart(2, '0');

    let reservedChanged ={
      id: this.selectedReserve.ID,
      cedulaPaciente: this.credentials.cedula,
      numeroCama: this.selectedReserve.numeroCama,
      fechaIngreso: formData.startDate.year + '-' + formData.startDate.month + '-' + formData.startDate.day,
      fechaSalida : finishYear + '-' + finishMonth + '-' + finishDay,
      nombrePaciente: this.credentials.nombre,
      procedimientos: this.selectedProcedures,
    }
    this._http.put(GlobalComponent.APIUrl + '/Reservacion/ModificarReservacion', reservedChanged,  { observe: 'response' } ).pipe(
      tap((response: HttpResponse<any>) => {
        const statusCode = response.status;
        console.log(`HTTP Status Code: ${statusCode}`);
        // Aquí puedes manejar el código de estado como prefieras
        if (statusCode === 200) {
          // Manejar éxito
          console.log('Reservación modificada exitosamente');
        } else if (statusCode === 500) {
          this.error = true;
          console.log('Error en el servidor al modificar la reservación');
        }
      })
    )
    .subscribe();
    console.log(reservedChanged);
  }
  sumarDias(fecha: Date, diasASumar: number): Date {
    const fechaNueva = new Date(fecha);
    fechaNueva.setDate(fecha.getDate() + diasASumar);
    return fechaNueva;
  }

}
