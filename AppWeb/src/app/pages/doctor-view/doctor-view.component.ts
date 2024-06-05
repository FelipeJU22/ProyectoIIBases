import { Component, TemplateRef, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GlobalComponent } from '../../global-component';
import { ModalDismissReasons, NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddHistoryComponent } from '../add-history/add-history.component';

@Component({
  selector: 'app-doctor-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgbDatepickerModule, NgbDropdownModule, AddHistoryComponent],
  templateUrl: './doctor-view.component.html',
  styleUrl: './doctor-view.component.scss'
})
export class DoctorViewComponent {
  private modalService = inject(NgbModal);

  closeResult: string = '';
  formRG: FormGroup;
  constructor( private _http: HttpClient, private fb: FormBuilder){
    this.formRG = this.fb.group({
      name: [''],
      lastName1: [''],
      lastName2: [''],
      id: [''],
      phoneNumber: [''],
      adress: [''],
      password: [''],
      dateOfBirth: [''],
      pathologies: this.fb.array([
        this.fb.group({
          pathology: [''],
          treatment: ['']
        })
      ])
    });

  }
  ngOnInit(){
    this._http.get(GlobalComponent.APIUrl + 'Paciente/GetAllPaciente').subscribe((data: any)=>{
      console.log(data);
    })
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
  removePathology(index: number) {
    this.pathologies.removeAt(index);
  }
  get pathologies() {
    return this.formRG.get('pathologies') as FormArray;
  }
  addPathology() {
    const pathologyGroup = this.fb.group({
      pathology: [''],
      treatment: ['']
    });
    this.pathologies.push(pathologyGroup);
  }
  onCloseModal(reason: string) {
    this.modalService.dismissAll(reason);
  }
}
