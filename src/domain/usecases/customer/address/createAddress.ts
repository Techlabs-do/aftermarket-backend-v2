import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';
import { CustomerAddresssDto } from '@data/dtos/users/customer-vendor-addresses.dto';

@Service()
export class CustomerCreateAddresssUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(data: CustomerAddresssDto[]) {
    const result = await this.customerVendor.createAddress(data);
    return new HttpResponse(result, false);
  }
}
