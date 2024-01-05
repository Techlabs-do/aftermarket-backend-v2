import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';
import { CustomerPhoneDto } from '@data/dtos/users/customer-phones.dto';

@Service()
export class CustomerUpdatePhoneUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: number, data: CustomerPhoneDto) {
    const result = await this.customerVendor.updatePhone(id, data);
    return new HttpResponse(result, false);
  }
}
