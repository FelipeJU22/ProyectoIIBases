import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '../../../global-component';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone:true,
})
export class FileUploadComponent {
  file: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('No se puede cargar varios archivos');
    }
    this.file = target.files[0];
  }

  upload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      const headers = new HttpHeaders({
        'Accept': 'application/json'
      });

      this.http.post(GlobalComponent.APIUrl + '/Paciente/UploadExcel' , formData, { headers })
        .subscribe(response => {
          console.log('Respuesta de la API:', response);
        }, error => {
          console.error('Error al subir el archivo:', error);
        });
    }
  }
}
