import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ExtendedCustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { CustomerVendorService } from '@data/services/customer-vendor.service';

@Service()
export class VendorUpdateUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: number, data: ExtendedCustomerVendorDto) {
    const result = await this.customerVendor.update(id, data);
    return new HttpResponse(result, false);
  }
}
