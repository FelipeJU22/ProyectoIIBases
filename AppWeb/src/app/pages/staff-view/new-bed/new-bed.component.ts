import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-bed',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-bed.component.html',
  styleUrl: './new-bed.component.scss'
})
export class NewBedComponent {
  @Output() closeModal = new EventEmitter<string>();
  formNewBed: FormGroup;
  equipmentList: any[] = [];
  roomList: any[] = [];

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.formNewBed = this.fb.group({
      number: [''],
      equipment: this.fb.array([]),
      room: [''],
      uci: [false]
    });
  }

  ngOnInit() {
    this.getEquipment();
    this.getRooms();
  }

  get equipmentControls() {
    return (this.formNewBed.get('equipment') as FormArray).controls;
  }

  getEquipment() {
    this._http.get(GlobalComponent.APIUrl + '/EquipoMedico/GetAllEquipos').subscribe((data: any) => {
      this.equipmentList = data;
      this.addEquipmentCheckboxes();
      console.log('EqList: ', this.equipmentList);
      console.log('Data: ', data);
    });
  }

  addEquipmentCheckboxes() {
    const equipmentFormArray = this.formNewBed.get('equipment') as FormArray;
    this.equipmentList.forEach(() => equipmentFormArray.push(new FormControl(false)));
  }

  getRooms() {
    this._http.get(GlobalComponent.APIUrl + '/Salon/GetAllSalones').subscribe((data: any) => {
      console.log(data);
      this.roomList = data;
    })
  }

  addBed() {
    const selectedEquipment = this.formNewBed.value.equipment
      .map((checked: boolean, i: number) => checked ? this.equipmentList[i].nombre : null)
      .filter((value: any) => value !== null);

    const bedData = JSON.stringify({
      numero: this.formNewBed.get('number')?.value,
      equiposMedicos: selectedEquipment,
      sala: this.formNewBed.get('room')?.value.numeroSalon,
      camaUCI: this.formNewBed.get('uci')?.value
    });

    const headers = { 'content-type': 'application/json' };
    this._http.post<any>(`${GlobalComponent.APIUrl}HistorialClinico/CrearCama`, bedData, { headers })
      .subscribe((res) => {
        console.log(res);
        this.closeModal.emit('Bed added successfully');
      });

    console.log(bedData);
  }
}
