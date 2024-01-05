import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';

@Service()
export class VendorListUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call() {
    const result = await this.customerVendor.getAllVendors();
    return new HttpResponse(result, false);
  }
}
