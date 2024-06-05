import { Component, TemplateRef, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GlobalComponent } from '../../global-component';
import { ModalDismissReasons, NgbDatepickerModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddHistoryComponent } from './add-history/add-history.component';
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgbDatepickerModule, NgbDropdownModule, AddHistoryComponent, EditHistoryComponent],
  templateUrl: './doctor-view.component.html',
  styleUrl: './doctor-view.component.scss'
})
export class DoctorViewComponent {
  private modalService = inject(NgbModal);

  closeResult: string = '';
  formRG: FormGroup;
  constructor( private _http: HttpClient, private fb: FormBuilder, private _router: Router){
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
        this.registerPatient();
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
  registerPatient(){
    const formData = this.formRG.value;
    const stuff = formData.pathologies;
    const pathologies: string[] = [] ;
    const treatments: string[] =[];
    for(let procedure of stuff){
      pathologies.push(procedure.pathology)
    }
    for(let procedure of stuff){
      treatments.push(procedure.treatment);
    }
    let pacienteRegistrado = {
      cedula: formData.id,
      telefono: formData.phoneNumber,
      nombre: formData.name,
      apellido1 : formData.lastName1,
      apellido2 : formData.lastName2,
      direccion: formData.adress,
      patologias : pathologies,
      tratPatologia: treatments,
      fechaNacimiento : formData.dateOfBirth.year+ '-' + formData.dateOfBirth.month+ '-' + formData.dateOfBirth.day,
      contraseña : formData.password
    }
    console.log(pacienteRegistrado);
    if(pacienteRegistrado.nombre != null && pacienteRegistrado.apellido1 !=null && pacienteRegistrado.apellido2 != null && pacienteRegistrado.cedula != null &&
      pacienteRegistrado.telefono != null && pacienteRegistrado.direccion != null && pacienteRegistrado.contraseña != null && pacienteRegistrado.fechaNacimiento != null){
        this._http.post(GlobalComponent.APIUrl + 'Paciente/CrearPaciente', pacienteRegistrado).subscribe();
    }
  }
  goBack(){
    this._router.navigate(['/home']);
  }
}
