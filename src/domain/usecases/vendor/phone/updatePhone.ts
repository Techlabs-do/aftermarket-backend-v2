import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';
import { CustomerPhoneDto } from '@data/dtos/users/customer-vendor-phones.dto';

@Service()
export class VendorUpdatePhoneUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: number, data: CustomerPhoneDto, user_id: number) {
    const result = await this.customerVendor.updatePhone(id, data, user_id);
    return new HttpResponse(result, false);
  }
}
