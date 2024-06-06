import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReserveTableComponent } from './reserve-table/reserve-table.component';
import { ShowTablesComponent } from './show-tables/show-tables.component';
import { HistoryComponent } from './history/history.component';
import { RatingsComponent } from './ratings/ratings.component';
@Component({
  selector: 'app-patient-view',
  standalone: true,
  imports: [NgbDropdownModule, ReactiveFormsModule, CommonModule, ReserveTableComponent, ShowTablesComponent, HistoryComponent, RatingsComponent],
  templateUrl: './patient-view.component.html',
  styleUrl: './patient-view.component.scss'
})
export class PatientViewComponent {
  private modalService = inject(NgbModal);
  formRA: FormGroup;
  closeResult = '';
  constructor(private fb: FormBuilder, private _router: Router) {
    this.formRA = this.fb.group({
      startDate: [''],
      procedures: this.fb.array(['']),
    });
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    )
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
  onCloseModal(reason: string) {
    this.modalService.dismissAll(reason);
    if (reason === "Cross click") {
      this.formRA.patchValue({
        startDate: null,
      });
    }
    else {
      const formData = this.formRA.value;
      const startDate = formData.startDate;
      console.log('here');
      console.log(startDate);
      this.formRA.patchValue({
        startDate: null,
      });
    }
  }
  goBack() {
    this._router.navigate(['/home']);
  }
}
