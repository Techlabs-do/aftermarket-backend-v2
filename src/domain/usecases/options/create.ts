import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { OptionDto } from '@data/dtos/options/options.dto';
import { OptionsService } from '@data/services/options.service';

@Service()
export class OptionCreateUsecase {
  @Inject()
  option: OptionsService;

  public async call(data: OptionDto) {
    const result = await this.option.create(data);
    return new HttpResponse(result, false);
  }
}
