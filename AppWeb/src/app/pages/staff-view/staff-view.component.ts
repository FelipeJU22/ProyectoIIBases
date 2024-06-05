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
    ModifyInstanceComponent
  ],
  templateUrl: './staff-view.component.html',
  styleUrl: './staff-view.component.scss'
})
export class StaffViewComponent {
  private modalService = inject(NgbModal);
  formNewRoom: FormGroup;
  roomList: any[] = [];
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
