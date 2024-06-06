import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProcedure } from '../../../models/procedure.model';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbDropdownModule,
    HttpClientModule
  ],
  templateUrl: './delete-personal.component.html',
  styleUrl: './delete-personal.component.scss'
})
export class DeletePersonalComponent {
  @Output() closeModal = new EventEmitter<string>();
  staffList: any[] = [];

  ngOnInit() {
    this.getStaff();
  }

  getStaff() {
    this._http.get(GlobalComponent.APIUrl + 'Personal/GetAllPersonal').subscribe((data: any) => {
      this.staffList = data;
      console.log('EqList: ', this.staffList)
      console.log('Data: ', data)
    })
  }

  constructor(private _http: HttpClient) {
  }

  deleteStaff(staffId: string) {
    this._http.delete(GlobalComponent.APIUrl + 'Personal/EliminarPersonal?cedula=' + staffId).subscribe((res) => {
      //this.closeModal.emit('Cross click');
      console.log(res);
      this.getStaff();
    });
  }

  closeModalWithReason(reason: string) {
    this.closeModal.emit(reason); // Emite el evento con el argumento 'Cross click'
  }

}
