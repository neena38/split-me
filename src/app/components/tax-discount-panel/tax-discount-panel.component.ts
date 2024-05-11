import { Component } from '@angular/core';
import { ActionType } from 'src/app/classes/constants';
import { DetailsService } from 'src/app/services/details.service';
import { StoreService } from 'src/app/services/store.service';
import { AppStoreService } from 'src/app/store/app-store.service';

@Component({
  selector: 'app-tax-discount-panel',
  templateUrl: './tax-discount-panel.component.html',
  styleUrls: ['./tax-discount-panel.component.scss'],
})
export class TaxDiscountPanelComponent {
  constructor(private details: DetailsService, private store: AppStoreService) {}
  onTaxDiscountChange(tax: string, discount: string) {
    const expRegx = /(?:(?:^|[-+])(?:\s*-?\d+(\.\d+)?\s*))+$/;
    if (expRegx.test(tax)) {
      tax = this.details.addbits(tax).toString();
    }
    this.store.dispatch(ActionType.UPDATE_TAX_DISCOUNT, {
      tax: this.details.tax,
      discount: this.details.discount,
    });
  }

  get taxValue() {
    return this.details.tax;
  }

  get discountValue() {
    return this.details.discount;
  }
}
