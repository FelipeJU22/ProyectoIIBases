import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerConfig, NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDate } from '../../models/date.model';

@Component({
  selector: 'app-patient-view',
  standalone: true,
  imports: [NgbDropdownModule, ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './patient-view.component.html',
  styleUrl: './patient-view.component.scss'
})
export class PatientViewComponent {
  private modalService = inject(NgbModal);
  formRA: FormGroup;
  closeResult = '';
  //Fechas de prueba
  disabledDates: IDate[] = [
    { year: 2024, month: 6, day: 7 },
    { year: 2024, month: 6, day: 14 },
    { year: 2024, month: 7, day: 4 }
  ];

  constructor(private fb: FormBuilder ,private _router: Router, private config: NgbDatepickerConfig){
    this.formRA = this.fb.group({
      startDate: [''],
      procedures: this.fb.array(['']),
    });
  }
  ngOnInit(){
    //Hace falta la inyección de la base de datos
    this.config.markDisabled = (date: { year: number, month: number, day: number }) => {
      return this.isDateDisabled(date);
    };
  }
  navigateToOptions(selectedOption:string){
    switch(selectedOption){
      case 'History':
        this._router.navigate(['/paciente/historial'])
        break;
      case 'Ratings':
        this._router.navigate(['/paciente/evaluacion'])
        break;
    }
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
    this.formRA.patchValue({
      startDate: null,
    });
  }
  isDateDisabled(date: { year: number, month: number, day: number }): boolean {
    return this.disabledDates.some(d =>
      d.year === date.year && d.month === date.month && d.day === date.day
    );
  }
}
