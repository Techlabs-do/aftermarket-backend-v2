import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';

@Service()
export class VendorGetPhoneUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: number, user_id: number) {
    const result = await this.customerVendor.getPhoneById(id, user_id);
    return new HttpResponse(result, false);
  }
}
