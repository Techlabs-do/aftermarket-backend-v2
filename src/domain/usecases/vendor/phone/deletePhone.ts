import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';

@Service()
export class VendorDeletePhoneUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: number, user_id: number) {
    const result = await this.customerVendor.deletePhoneById(id, user_id);
    return new HttpResponse(result, false);
  }
}
