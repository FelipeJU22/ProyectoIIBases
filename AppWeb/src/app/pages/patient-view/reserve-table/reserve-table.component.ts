import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerConfig, NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { IProcedure } from '../../../models/procedure.model';
import { IDate } from '../../../models/date.model';
@Component({
  selector: 'app-reserve-table',
  standalone: true,
  imports: [NgbDatepickerModule, ReactiveFormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './reserve-table.component.html',
  styleUrl: './reserve-table.component.scss'
})
export class ReserveTableComponent {

  @Input() formRA: FormGroup;
  @Output() closeModal = new EventEmitter<string>();
  procedures: IProcedure[] =[
    {name:'Sana colita de rana', time: 1},
    {name: 'Beso de abuelita', time: 2},
    {name: 'Chaquetón', time: 1},
    {name: 'Desfibrilación', time:2},
    {name: 'Eso no es nada', time:1},
    {name: 'Le falta Dios', time:3}
  ];
  //Fechas de prueba
  disabledDates: IDate[] = [
    { day: 7, month: 6, year: 2024 },
    { day: 14, month: 6, year: 2024 },
    { day: 4, month: 7, year: 2024 }
  ];
  selectedProcedures: string[] = [];
  totalDays:number=0;
  constructor(private fb: FormBuilder, private config: NgbDatepickerConfig){
    this.formRA = this.fb.group({
      startDate: [''],
      procedures: this.fb.array(['']),
    });
    const fechaInicial = new Date(2024, 11, 31); // 31 de diciembre
  // Sumar días
  const diasASumar = 2;
  const fechaFinal = this.sumarDias(fechaInicial, diasASumar);

  console.log("Fecha inicial:", fechaInicial.toISOString().slice(0,10));
  console.log("Días a sumar:", diasASumar);
  console.log("Fecha final:", fechaFinal.toISOString().slice(0,10));
  }
  ngOnInit(){
    //Hace falta la inyección de la base de datos
    this.config.markDisabled = (date: { year: number, month: number, day: number }) => {
      return this.isDateDisabled(date);
    };
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
      if(procedureI.name === procedure){
        this.totalDays -= procedureI.time;
        break;
      }
    }
    this.selectedProcedures = this.selectedProcedures.filter((item :string)=> item !== procedure);
  }
  sumarDias(fecha: Date, diasASumar: number): Date {
    const fechaNueva = new Date(fecha);
    fechaNueva.setDate(fecha.getDate() + diasASumar);
    return fechaNueva;
  }

}
