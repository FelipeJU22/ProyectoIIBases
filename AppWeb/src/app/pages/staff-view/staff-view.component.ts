import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerConfig, NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDate } from '../../models/date.model';
import { GlobalComponent } from '../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NewRoomComponent } from './new-room/new-room.component';
import { DeleteRoomComponent } from './delete-room/delete-room.component';
import { ModifyInstanceComponent } from './modify-instance/modify-instance.component';
import { NewMedicalEquipmentComponent } from './new-medical-equipment/new-medical-equipment.component';
import { ModifyMedicalEquipmentComponent } from './modify-medical-equipment/modify-medical-equipment.component';
import { NewBedComponent } from './new-bed/new-bed.component';
import { NewProcedureComponent } from './new-procedure/new-procedure.component';
import { ModifyProcedureComponent } from './modify-procedure/modify-procedure.component';
import { NewPersonalComponent } from './new-personal/new-personal.component';
import { ModifyPersonalComponent } from './modify-personal/modify-personal.component';
import { ModifyBedComponent } from './modify-bed/modify-bed.component';
import { DeletePersonalComponent } from './delete-personal/delete-personal.component';
import { BulkLoadComponent } from './bulk-load/bulk-load.component';
import { ReportComponent } from './report/report.component';
@Component({
  selector: 'app-staff-view',
  standalone: true,
  imports: [
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    CommonModule,
    HttpClientModule,
    NewRoomComponent,
    DeleteRoomComponent,
    ModifyInstanceComponent,
    NewMedicalEquipmentComponent,
    ModifyMedicalEquipmentComponent,
    NewBedComponent,
    NewProcedureComponent,
    ModifyProcedureComponent,
    NewPersonalComponent,
    ModifyPersonalComponent,
    ModifyBedComponent,
    DeletePersonalComponent,
    BulkLoadComponent,
    ReportComponent
  ],
  templateUrl: './staff-view.component.html',
  styleUrl: './staff-view.component.scss'
})
export class StaffViewComponent {
  private modalService = inject(NgbModal);
  formNewRoom: FormGroup;
  roomList: any[] = [];
  medicalEqList: any[] = [];
  procedureList: any[] = [];
  staffList: any[] = [];
  bedList: any[] = [];
  closeResult = '';

  constructor(private fb: FormBuilder, private _router: Router, private config: NgbDatepickerConfig, private _http: HttpClient) {
    this.formNewRoom = this.fb.group({
      roomNumber: [''],
      roomName: [''],
      roomCapacity: [''],
      floor: [''],
      gender: ['']
    });
  }
  ngOnInit() {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    ).finally(() => {
      this.resetForm();
    });
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  resetForm() {
    this.formNewRoom.patchValue({
      startDate: null,
    });
  }

  getRooms() {
    this._http.get(GlobalComponent.APIUrl + '/Salon/GetAllSalones').subscribe((data: any) => {
      console.log(data);
      this.roomList = data;
    })
  }

  getRooms2(action: string, modalTemplate: TemplateRef<any>) {
    this._http.get(GlobalComponent.APIUrl + '/Salon/GetAllSalones').subscribe((data: any) => {
      console.log('Getting Rooms: ', data);
      this.roomList = data;
    })

    this.open(modalTemplate);
  }

  getEquipment(modalTemplate: TemplateRef<any>) {
    this._http.get(GlobalComponent.APIUrl + '/EquipoMedico/GetAllEquipos').subscribe((data: any) => {
      this.medicalEqList = data;
      console.log('EqList: ', data)
    })
    this.open(modalTemplate);
  }

  getProcedure(modalTemplate: TemplateRef<any>) {
    this._http.get(GlobalComponent.APIUrl + '/Procedimiento/GetAllProcedimientos').subscribe((data: any) => {
      this.procedureList = data;
      console.log('procedureList: ', this.procedureList)
      console.log('Data: ', data)
    })
    this.open(modalTemplate);
  }

  getStaff(modalTemplate: TemplateRef<any>) {
    this._http.get(GlobalComponent.APIUrl + 'Personal/GetAllPersonal').subscribe((data: any) => {
      this.staffList = data;
      console.log('staffList: ', this.staffList)
      console.log('Data: ', data)
    })
    this.open(modalTemplate);
  }

  getBeds(modalTemplate: TemplateRef<any>) {
    this._http.get(GlobalComponent.APIUrl + 'HistorialClinico/GetAllCamas').subscribe((data: any) => {
      this.bedList = data;
      console.log('BedList: ', this.bedList)
      console.log('Data: ', data)
    })
    this.open(modalTemplate);
  }

  deleteRooms() {
    this._http.delete(GlobalComponent.APIUrl + '/Salon/EliminarSalon').subscribe((data: any) => {
      console.log(data);
    })
  }

  addRoom(formData: any) {
    console.log(formData)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      "numeroSalon": formData.roomNumber,
      "nombreSalon": formData.roomName,
      "capacidad": formData.roomCapacity,
      "piso": formData.floor,
      "genero": formData.gender
    });
    this._http
      .post<any>(GlobalComponent.APIUrl + '/Salon/CrearSalon', body, {
        headers: headers
      })
      .subscribe((res) => console.log(res));
    console.log(body);
    console.log('New Room added!');
  }

  onCloseModal(reason: string) {
    this.modalService.dismissAll(reason);
    console.log(reason);
    if (reason === "Cross click") {
      this.formNewRoom.patchValue({
        startDate: null,
      });
    }
    else {
      const formData = this.formNewRoom.value;
      const startDate = formData.startDate;
      //Creo que Aqui hacemos el PUT para el form
      this.addRoom(formData);
      this.formNewRoom.patchValue({
        startDate: null,
      });
    }
  }
}
