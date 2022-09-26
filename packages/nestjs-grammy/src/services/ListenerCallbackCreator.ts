import { Injectable } from '@nestjs/common';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';

import { MetadataName } from '../enums';
import { ParamsFactory } from '../factories';
import { TUnknownFunction } from '../types';
import { TContextType } from '../types/TContextType';
import { CONTEXT_NAME } from '../utils';

@Injectable()
export class ListenerCallbackCreator {
  private readonly paramsFactory = new ParamsFactory();

  public constructor(
    private readonly externalContextCreator: ExternalContextCreator,
  ) {}

  public create(
    instance: Record<string, unknown>,
    methodRef: TUnknownFunction,
    methodName: string,
  ): TUnknownFunction {
    return this.externalContextCreator.create<
      Record<number, ParamMetadata>,
      TContextType
    >(
      instance,
      methodRef,
      methodName,
      MetadataName.ROUTE_ARGS,
      this.paramsFactory,
      undefined,
      undefined,
      undefined,
      CONTEXT_NAME,
    );
  }
}
