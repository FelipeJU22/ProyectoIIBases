import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../../global-component';
import { SaveCredentialsPService } from '../../../services/save-credentials-p.service';
import { ICredentialsP } from '../../../models/credentialsP.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [NgbRatingModule, HttpClientModule, FormsModule],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})
export class RatingsComponent {
  @Output() closeModal = new EventEmitter<string>();
  ratingA = 5;
  ratingT = 5;
  ratingP = 5;
  comentarios: string = '';
  credentials: ICredentialsP;
  constructor(private _http: HttpClient, private _credentialsPservice: SaveCredentialsPService){
    this.credentials = this._credentialsPservice.getCredenciales();
  }
  onRatingChangeA(newRating: number) {
    this.ratingA = newRating; // Actualiza la variable `rating` con el nuevo valor
  }
  onRatingChangeT(newRating: number) {
    this.ratingT = newRating; // Actualiza la variable `rating` con el nuevo valor
  }
  onRatingChangeP(newRating: number) {
    this.ratingP = newRating; // Actualiza la variable `rating` con el nuevo valor
  }
  submitInfo(){
    let evaluation ={
      cedulaPaciente: this.credentials.cedula,
      aseo: this.ratingA,
      trato: this.ratingT,
      puntualidad: this.ratingP,
      comentario: this.comentarios
    }
    console.log(evaluation)
    this._http.post(GlobalComponent.APIUrl + 'Evaluacion/AgregarEvaluacion', evaluation).subscribe();
    this.closeModal.emit('Save click')
  }
}
