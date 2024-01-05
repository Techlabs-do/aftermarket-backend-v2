import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ExtendedCustomerVendorDto } from '@data/dtos/auth/customer-vendor.dto';
import { CustomerVendorService } from '@data/services/customer-vendor.service';

@Service()
export class CustomerUpdateUsecase {
  @Inject()
  customerVendor: CustomerVendorService;

  public async call(id: string, data: ExtendedCustomerVendorDto) {
    const result = await this.customerVendor.update(Number(id), data);
    return new HttpResponse(result, false);
  }
}
