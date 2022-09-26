import { ParamsFactory as IParamsFactory } from '@nestjs/core/helpers/external-context-creator';

import { ParamName } from '../enums/ParamName';
import { TContext } from '../types/TContext';

export class ParamsFactory implements IParamsFactory {
  public exchangeKeyForValue(
    type: ParamName,
    data: string,
    [ctx]: [TContext],
  ): unknown {
    switch (type) {
      case ParamName.CONTEXT:
        return ctx;
      case ParamName.SENDER:
        return data ? ctx.from?.[data] : ctx.from;
      case ParamName.MESSAGE:
        return data ? ctx.message?.[data] : ctx.message;
      case ParamName.API:
        return ctx.api;
    }
  }
}
