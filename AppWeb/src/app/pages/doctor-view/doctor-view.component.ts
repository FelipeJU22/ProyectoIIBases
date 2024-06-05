import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GlobalComponent } from '../../global-component';

@Component({
  selector: 'app-doctor-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './doctor-view.component.html',
  styleUrl: './doctor-view.component.scss'
})
export class DoctorViewComponent {
  constructor(private _http: HttpClient) {
  }
  ngOnInit() {
    this._http.get(GlobalComponent.APIUrl + '/Salon/GetAllSalones').subscribe((data: any) => {
      console.log(data);
    })
  }
}
