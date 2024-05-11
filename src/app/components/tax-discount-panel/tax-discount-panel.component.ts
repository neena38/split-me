import { Component } from '@angular/core';
import { addbits } from 'src/app/classes/commons';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-tax-discount-panel',
  templateUrl: './tax-discount-panel.component.html',
  styleUrls: ['./tax-discount-panel.component.scss'],
})
export class TaxDiscountPanelComponent {
  constructor(private details: DetailsService) {}

  onTaxDiscountChange(tax: string, discount: string) {
    const expRegx = /(?:(?:^|[-+])(?:\s*-?\d+(\.\d+)?\s*))+$/;
    if (expRegx.test(tax)) {
      tax = addbits(tax).toString();
    }
    this.details.updateModifiers(parseFloat(tax), parseFloat(discount));
  }

  get modifiers$() {
    return this.details.modifiers$;
  }
}
