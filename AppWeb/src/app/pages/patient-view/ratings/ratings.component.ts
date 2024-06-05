import { Component, EventEmitter, Output } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})
export class RatingsComponent {
  @Output() closeModal = new EventEmitter<string>();
  rating = 5;
  constructor(){
  }
  onRatingChange(newRating: number) {
    console.log('Nuevo valor de rating:', newRating);
    this.rating = newRating; // Actualiza la variable `rating` con el nuevo valor
  }
}
