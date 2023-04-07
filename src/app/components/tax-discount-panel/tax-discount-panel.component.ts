import { Component } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-tax-discount-panel',
  templateUrl: './tax-discount-panel.component.html',
  styleUrls: ['./tax-discount-panel.component.scss']
})
export class TaxDiscountPanelComponent {

  constructor(private details:DetailsService){

  }
  onTaxDiscountChange(tax: string, discount: string) {
    this.details.tax=parseFloat(tax);
    this.details.discount=parseFloat(discount);
  }

  get taxValue(){
    return this.details.tax;
  }

  get discountValue(){
    return this.details.discount;
  }
}
