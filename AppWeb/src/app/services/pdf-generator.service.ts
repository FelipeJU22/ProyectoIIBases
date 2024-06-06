import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  async generatePDF(element: HTMLElement) {
    // Utiliza html2canvas para capturar una captura de pantalla del elemento
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // Crear un nuevo PDF
    const pdf = new jsPDF();

    // Agregar la imagen capturada al PDF
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Guardar el PDF
    pdf.save('contenido.pdf');
  }
}
