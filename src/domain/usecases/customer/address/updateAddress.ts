import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';
import { CustomerAddressDto } from '@data/dtos/users/customer-vendor-addresses.dto';

@Service()
export class CustomerUpdateAddressUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: number, data: CustomerAddressDto) {
    const result = await this.customerVendor.updateAddress(id, data);
    return new HttpResponse(result, false);
  }
}
