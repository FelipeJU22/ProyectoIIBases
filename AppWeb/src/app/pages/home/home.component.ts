import { Component, inject, TemplateRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global-component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SaveCredentialsPService } from '../../services/save-credentials-p.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule, HttpClientModule, FileUploadComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {

  private modalService = inject(NgbModal);
  closeResult = '';
  formLI: FormGroup;
  formRG: FormGroup;
  showPop: boolean = false;
  selectedView: string = "";
  model: any;

  constructor(private fb: FormBuilder, private _router: Router, private _http: HttpClient, private _credentialsPService: SaveCredentialsPService) {
    this.formLI = this.fb.group({
      id: [''],
      password: ['']
    });
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
  open(content: TemplateRef<any>, view: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        if (view != '') {
          this.selectedView = view;
          this.logIn();
        }
        else {
          this.selectedView = 'Patient'
          this.signIn();
        }
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
  logIn() {
    const formData = this.formLI.value;
    const id = formData.id;
    const password = formData.password;
    if (id != null && password) {
      this.navigateToViews(id, password);
    }
  }
  signIn() {
    const formData = this.formRG.value;
    const stuff = formData.pathologies;
    const pathologies: string[] = [];
    const treatments: string[] = [];
    for (let procedure of stuff) {
      pathologies.push(procedure.pathology)
    }
    for (let procedure of stuff) {
      treatments.push(procedure.treatment);
    }
    let pacienteRegistrado = {
      cedula: formData.id,
      telefono: formData.phoneNumber,
      nombre: formData.name,
      apellido1: formData.lastName1,
      apellido2: formData.lastName2,
      direccion: formData.adress,
      patologias: pathologies,
      tratPatologia: treatments,
      fechaNacimiento: formData.dateOfBirth.year + '-' + formData.dateOfBirth.month + '-' + formData.dateOfBirth.day,
      contraseña: formData.password
    }
    console.log(pacienteRegistrado);
    if (pacienteRegistrado.nombre != null && pacienteRegistrado.apellido1 != null && pacienteRegistrado.apellido2 != null && pacienteRegistrado.cedula != null &&
      pacienteRegistrado.telefono != null && pacienteRegistrado.direccion != null && pacienteRegistrado.contraseña != null && pacienteRegistrado.fechaNacimiento != null) {
      this._router.navigate(['/paciente']);
      this._http.post(GlobalComponent.APIUrl + 'Paciente/CrearPaciente', pacienteRegistrado).subscribe();
    }
  }
  resetForm() {
    this.formLI.patchValue({
      id: null,
      password: null
    });
    this.formRG.patchValue({
      name: null,
      lastName1: null,
      lastName2: null,
      id: null,
      phoneNumber: null,
      adress: null,
      password: null,
      dateofBirth: null,
    })
    while (this.pathologies.length > 0) {
      this.pathologies.removeAt(this.pathologies.length - 1)
    }
  }
  navigateToViews(id: number, password: string) {
    switch (this.selectedView) {
      case 'Doctor':
        this._http.get(GlobalComponent.APIUrl + 'Personal/LoginPersonal?cedula=' + id + '&contrase%C3%B1a=' + password).subscribe((data: any) => {
          if (data.rol === 1 || data.rol === 2) {
            this._credentialsPService.setCredenciales(data.nombre, data.apellido1, data.apellido2, data.cedula);
            this._router.navigate(['/doctor']);
          }
        })
        break;
      case 'Patient':
        this._http.get(GlobalComponent.APIUrl + 'Paciente/LoginPaciente?cedula=' + id + '&contrase%C3%B1a=' + password).subscribe((data: any) => {
          if (data != null) {
            this._credentialsPService.setCredenciales(data.nombre, data.apellido1, data.apellido2, data.cedula);
            this._router.navigate(['/paciente']);
          }
        })
        break;
      case 'Staff':
        this._http.get(GlobalComponent.APIUrl + 'Personal/LoginPersonal?cedula=' + id + '&contrase%C3%B1a=' + password).subscribe((data: any) => {
          if (data.rol === 3) {
            this._credentialsPService.setCredenciales(data.nombre, data.apellido1, data.apellido2, data.cedula);
            this._router.navigate(['/personal'])
          }
        })
        break;
    }
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
  removePathology(index: number) {
    this.pathologies.removeAt(index);
  }
  createPathology(): FormControl {
    return this.fb.control('');
  }
  onSubmit() {
    console.log(this.formRG.value);
  }
}
