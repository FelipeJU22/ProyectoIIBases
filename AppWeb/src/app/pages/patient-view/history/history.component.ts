import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GlobalComponent } from '../../../global-component';
import { SaveCredentialsPService } from '../../../services/save-credentials-p.service';
import { ICredentialsP } from '../../../models/credentialsP.model';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Output() closeModal = new EventEmitter<string>();
  history:any[] = [];
  tratamientos: string[] =[];
  procedimientos: string[] = [];
  credentials: ICredentialsP;
  constructor(private _http: HttpClient, private _credentialsPservice: SaveCredentialsPService){
    this.credentials = this._credentialsPservice.getCredenciales();
  }
  ngOnInit(){
    this._http.get(GlobalComponent.APIUrl + 'HistorialClinico/ObtenerHistorialCliente?cedula=' + this.credentials.cedula).subscribe((data: any)=>{
      this.history = data;
      console.log(this.history);
    })
  }
}
