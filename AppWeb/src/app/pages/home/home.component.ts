import { Component, inject ,TemplateRef} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {

  private modalService = inject(NgbModal);
	closeResult = '';
  formLI: FormGroup;
  formRG: FormGroup;
  showPop: boolean = false;
  selectedView: string ="";
  model: any;

  constructor(private fb: FormBuilder, private _router: Router){
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
    this.pathologies.removeAt(0);

  }
  open(content: TemplateRef<any>, view:string) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        if(view != ''){
          this.selectedView = view;
          this.logIn();
        }
        else{
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
    if( id != null && password){
      this.navigateToViews();
    }
  }
  signIn(){
    const formData = this.formRG.value;
    const name = formData.name;
    const lastName1 = formData.lastName1;
    const lastName2 = formData.lastName2;
    const id = formData.id;
    const phoneNumber: number = formData.phoneNumber;
    const adress = formData.adress;
    const password = formData.password;
    const dateOfBirth = formData.dateOfBirth;
    const pathologies = this.pathologies;
    if(name != null && lastName1 !=null && lastName2 != null && id != null && phoneNumber != null && adress != null && password != null
      && dateOfBirth != null){
        this.navigateToViews();
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
      dateofBirth:null,
    })
    while(this.pathologies.length>0){
      this.pathologies.removeAt(this.pathologies.length - 1)
    }
  }
  navigateToViews(){
    switch(this.selectedView){
      case 'Doctor':
        this._router.navigate(['/doctor']);
        break;
      case 'Patient':
        this._router.navigate(['/paciente'])
        break;
      case 'Staff':
        this._router.navigate(['/personal'])
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
