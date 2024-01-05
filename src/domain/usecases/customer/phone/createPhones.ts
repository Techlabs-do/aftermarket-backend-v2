import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';
import { CustomerPhonesDto } from '@data/dtos/users/customer-vendor-phones.dto';

@Service()
export class CustomerCreatePhonesUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(data: CustomerPhonesDto[]) {
    const result = await this.customerVendor.createPhones(data);
    return new HttpResponse(result, false);
  }
}
