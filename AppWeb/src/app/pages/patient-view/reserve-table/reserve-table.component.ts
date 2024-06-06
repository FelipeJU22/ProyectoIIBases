import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerConfig, NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { IProcedure } from '../../../models/procedure.model';
import { IDate } from '../../../models/date.model';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { GlobalComponent } from '../../../global-component';
import { SaveCredentialsPService } from '../../../services/save-credentials-p.service';
import { ICredentialsP } from '../../../models/credentialsP.model';
import { tap } from 'rxjs';
@Component({
  selector: 'app-reserve-table',
  standalone: true,
  imports: [NgbDatepickerModule, ReactiveFormsModule, CommonModule, NgbDropdownModule, HttpClientModule, NgbAlertModule],
  templateUrl: './reserve-table.component.html',
  styleUrl: './reserve-table.component.scss'
})
export class ReserveTableComponent {

  @Input() formRA: FormGroup;
  @Output() closeModal = new EventEmitter<string>();
  credentials: ICredentialsP;
  procedures: IProcedure[] =[];
  error: boolean = false;
  //Fechas de prueba
  disabledDates: IDate[] = [
    { day: 7, month: 6, year: 2024 },
    { day: 14, month: 6, year: 2024 },
    { day: 4, month: 7, year: 2024 }
  ];
  selectedProcedures: string[] = [];
  totalDays:number=0;
  constructor(private fb: FormBuilder, private config: NgbDatepickerConfig, private _http : HttpClient, private _credentialsPservice: SaveCredentialsPService){
    this.formRA = this.fb.group({
      startDate: [''],
      procedures: this.fb.array(['']),
    });
    this.credentials = this._credentialsPservice.getCredenciales();

  }
  ngOnInit(){
    //Hace falta la inyección de la base de datos
    this.config.markDisabled = (date: { year: number, month: number, day: number }) => {
      return this.isDateDisabled(date);
    };
    this._http.get(GlobalComponent.APIUrl + 'Procedimiento/GetAllProcedimientos').subscribe((data: any)=>{
      this.procedures = data;
      console.log(this.procedures);
    })
  }
  isDateDisabled(date: { year: number, month: number, day: number }): boolean {
    return this.disabledDates.some(d =>
      d.year === date.year && d.month === date.month && d.day === date.day
    );
  }
  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason); // Emite el evento con el argumento 'Cross click'
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
  convertDate(date: IDate){
    return new Date(date.year, date.month -1, date.day);
  }
  removeProcedure(procedure: string){
    for(let procedureI of this.procedures){
      if(procedureI.nombre === procedure){
        this.totalDays -= procedureI.diasRecuperacion;
        break;
      }
    }
    this.selectedProcedures = this.selectedProcedures.filter((item :string)=> item !== procedure);
  }
  generarReserva(){
    const formData = this.formRA.value;
    console.log(formData.startDate.year);
    const DateStartFormatted = new Date(formData.startDate.year, formData.startDate.month -1, formData.startDate.day);
    const finishDayFinal = this.sumarDias(DateStartFormatted, this.totalDays);
    const finishYear = finishDayFinal.getFullYear();
    const finishMonth = (finishDayFinal.getMonth() + 1).toString().padStart(2, '0');
    const finishDay = finishDayFinal.getDate().toString().padStart(2, '0');
    let reservation ={
      cedulaPaciente: this.credentials.cedula,
      fechaIngreso: formData.startDate.year + "-" + formData.startDate.month + "-" + formData.startDate.day,
      fechaSalida: finishYear + '-' + finishMonth + '-' + finishDay,
      nombrePaciente: this.credentials.nombre,
      procedimientos: this.selectedProcedures,
    }
    this._http.post(GlobalComponent.APIUrl + 'Reservacion/VerificarReservacion', reservation, { observe: 'response' }).pipe(
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
    console.log(reservation);
    this.closeModal.emit('Save click')
  }
  sumarDias(fecha: Date, diasASumar: number): Date {
    const fechaNueva = new Date(fecha);
    fechaNueva.setDate(fecha.getDate() + diasASumar);
    return fechaNueva;
  }

}
