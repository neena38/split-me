import { Component, HostListener } from '@angular/core';
import { KeyBindingService } from './services/keybinding.service';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'split-me';

  constructor(private keyBinding: KeyBindingService) { }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.keyBinding.keydown(event);
  }
async fileChange(event:any){
  const file:File = event.target.files[0];
  console.log(file);
  await this.doOCR(file);
  
}

 async doOCR(file:File) {
  console.log("trying teseract bleh");
  
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await (await worker).loadLanguage('eng');
    await (await worker).initialize('eng');
    const text = await (await worker).recognize(file);
    //this.ocrResult = text;
    console.log("whatever this is");
    
    console.log(text);
    await (await worker).terminate();
  }
}