import { Component } from '@angular/core';

@Component({
  selector: 'app-tax-discount-panel',
  templateUrl: './tax-discount-panel.component.html',
  styleUrls: ['./tax-discount-panel.component.scss']
})
export class TaxDiscountPanelComponent {
  onTaxDiscountChange(tax: string, discount: string) {
    console.log(tax);
    console.log(discount);
  }
}
