import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-bed',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './modify-bed.component.html',
  styleUrl: './modify-bed.component.scss'
})
export class ModifyBedComponent {
  @Input() bedList: any[] = [];
  @Output() closeModal = new EventEmitter<string>();
  @Output() onModifyRoom = new EventEmitter<any>();
  equipmentList: any[] = [];
  roomList: any[] = [];

  selectedBed: any;
  modifyForm: FormGroup;
  view: 'list' | 'form' = 'list';

  ngOnInit() {
    this.getEquipment();
    this.getRooms();
  }

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.modifyForm = this.fb.group({
      number: [''],
      equipment: this.fb.array([]),
      room: [''],
      uci: [false]
    });
  }

  get equipmentControls() {
    return (this.modifyForm.get('equipment') as FormArray).controls;
  }

  getEquipment() {
    this._http.get(GlobalComponent.APIUrl + '/EquipoMedico/GetAllEquipos').subscribe((data: any) => {
      this.equipmentList = data;
      this.addEquipmentCheckboxes();
      console.log('EqList: ', this.equipmentList);
      console.log('Data: ', data);
    });
  }

  getRooms() {
    this._http.get(GlobalComponent.APIUrl + '/Salon/GetAllSalones').subscribe((data: any) => {
      console.log(data);
      this.roomList = data;
    })
  }

  getBeds() {
    this._http.get(GlobalComponent.APIUrl + 'HistorialClinico/GetAllCamas').subscribe((data: any) => {
      this.bedList = data;
      console.log('BedList: ', this.bedList)
      console.log('Data: ', data)
    })
  }

  addEquipmentCheckboxes() {
    const equipmentFormArray = this.modifyForm.get('equipment') as FormArray;
    this.equipmentList.forEach(() => equipmentFormArray.push(new FormControl(false)));
  }

  selectBed(bed: any) {
    this.selectedBed = bed;
    console.log('This is bed:', bed)

    // Initialize the form controls for checkboxes and radio buttons
    const selectedEquipment = this.equipmentList.map(equipment =>
      bed.equiposMedicos.includes(equipment.nombre));

    this.modifyForm.patchValue({
      number: bed.numero,
      room: bed.sala,
      uci: bed.camaUCI
    });

    this.modifyForm.setControl('equipment', this.fb.array(selectedEquipment.map(selected => new FormControl(selected))));

    this.view = 'form';
  }

  modifyBed() {
    const selectedEquipment = this.modifyForm.value.equipment
      .map((checked: boolean, i: number) => checked ? this.equipmentList[i].nombre : null)
      .filter((value: any) => value !== null);

    const bedData = JSON.stringify({
      numero: this.modifyForm.get('number')?.value,
      equiposMedicos: selectedEquipment,
      sala: this.modifyForm.get('room')?.value,
      camaUCI: this.modifyForm.get('uci')?.value
    });

    const headers = { 'content-type': 'application/json' };
    this._http.put<any>(`${GlobalComponent.APIUrl}HistorialClinico/ModificarCama`, bedData, { headers })
      .subscribe((res) => {
        console.log(res);
        this.getBeds()
        this.view = 'list';
        //this.closeModal.emit('Cross click');
      });

    console.log(bedData);
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason);
  }
}
