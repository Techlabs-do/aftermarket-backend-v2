import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { OptionsService } from '@data/services/options.service';

@Service()
export class OptionListUsecase {
  @Inject()
  option: OptionsService;

  public async call() {
    const result = await this.option.listOption();
    return new HttpResponse(result, false);
  }
}
