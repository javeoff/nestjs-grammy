import { assignMetadata } from '@nestjs/common';

import { MetadataName } from '../enums';
import { ParamName } from '../enums/ParamName';

export type TParamData = object | string | number;

export class ParamDecoratorFactory {
  public static create(paramName: ParamName) {
    return (data?: TParamData): ParameterDecorator =>
      (target, key, index) => {
        const args =
          Reflect.getMetadata(
            MetadataName.ROUTE_ARGS,
            target.constructor,
            key,
          ) || {};

        Reflect.defineMetadata(
          MetadataName.ROUTE_ARGS,
          assignMetadata(args, paramName, index, data),
          target.constructor,
          key,
        );
      };
  }
}
