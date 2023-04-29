import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
@Injectable({
  providedIn: 'root',
})
export class SummaryExportService {
  constructor() {}

  download(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    type: string
  ) {
    const FILEURI = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = 'food-summary.png';
    link.href = FILEURI;
    if (type == 'img') {
      link.click();
    } else {
      const orientation = width >= height ? 'l' : 'p';
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
      });
      pdf.internal.pageSize.width = width * 0.5;
      pdf.internal.pageSize.height = height * 0.5;
      pdf.addImage(FILEURI, 'PNG', 0, 0, width * 0.5, height * 0.5);
      pdf.save('food-summary.pdf');
    }

    console.log('downlaod complete');
  }
}
