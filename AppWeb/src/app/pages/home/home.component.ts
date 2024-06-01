import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  showPop: boolean = false;
  selectedView: string ="";
  constructor(){

  }
  changeShowPop(){
    this.showPop = !this.showPop;
  }
  login(view:string){
    if (this.showPop == false){
      this.changeShowPop()
      this.selectedView = view;
    }
  }
}
