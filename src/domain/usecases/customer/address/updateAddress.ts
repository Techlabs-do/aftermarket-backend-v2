import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CustomerVendorService } from '@data/services/customer-vendor.service';
import { CustomerAddressDto } from '@data/dtos/users/customer-vendor-addresses.dto';

@Service()
export class CustomerUpdateAddressUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: number, data: CustomerAddressDto, user_id: number) {
    const result = await this.customerVendor.updateAddress(id, data, user_id);
    return new HttpResponse(result, false);
  }
}
