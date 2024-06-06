import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ElementRef, ViewChild  } from '@angular/core';
import { GlobalComponent } from '../../../global-component';
import { PdfGeneratorService } from '../../../services/pdf-generator.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  @Output() closeModal = new EventEmitter<string>();
  commentsQuantity: number = 0;
  comments: any[] = [];
  averageA: number = 0;
  averageT: number = 0;
  averageP: number = 0;
  @ViewChild('content', { static: false }) content!: ElementRef;
  constructor(private _http: HttpClient, private _pdfGeneratorService: PdfGeneratorService){}
  ngOnInit(){
    this._http.get(GlobalComponent.APIUrl + 'Evaluacion/GetAllEvaluaciones').subscribe((data: any)=>{
      this.comments = data;
      this.getAverage();
    })
  }
  getAverage(){
    let sumA = 0;
    let sumT = 0;
    let sumP = 0;
    for(let comment of this.comments ){
      sumA += comment.Aseo;
      sumT += comment.Trato;
      sumP += comment.Puntualidad;
    }
    this.averageA = sumA / this.comments.length;
    this.averageT = sumT / this.comments.length;
    this.averageP = sumP / this.comments.length;
    console.log(this.averageA);
  }
  generatePDF() {
    this._pdfGeneratorService.generatePDF(this.content.nativeElement);
    this.closeModal.emit('Save click');
  }
}
