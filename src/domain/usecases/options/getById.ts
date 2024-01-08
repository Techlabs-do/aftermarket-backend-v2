import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { OptionsService } from '@data/services/options.service';

@Service()
export class OptionGetUsecase {
  @Inject()
  option: OptionsService;

  public async call(id: number) {
    const result = await this.option.getById(id);
    return new HttpResponse(result, false);
  }
}
