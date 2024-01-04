import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';

@Service()
export class VendorGetAddressUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: string) {
    const result = await this.customerVendor.getAddressById(Number(id));
    return new HttpResponse(result, false);
  }
}
