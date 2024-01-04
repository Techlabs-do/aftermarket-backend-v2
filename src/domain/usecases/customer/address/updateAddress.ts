import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';
import { CustomerAddressDto } from '@data/dtos/users/customer-vendor-addresses.dto';

@Service()
export class CustomerUpdateAddressUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: string, data: CustomerAddressDto) {
    const result = await this.customerVendor.updateAddress(Number(id), data);
    return new HttpResponse(result, false);
  }
}
