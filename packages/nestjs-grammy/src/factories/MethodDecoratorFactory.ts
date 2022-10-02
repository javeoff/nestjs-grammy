import { FilterQuery, Middleware } from 'grammy';

import { MetadataName } from '../enums';
import { TFilter, TListenerType, TMethodType } from '../types';

type TSearchQuery = string | RegExp | string[];

type ComposerMethodArgs = TFilter<Parameters<any>, Middleware<never>>;

export class MethodDecoratorFactory {
  public static create(listenerType: TListenerType, methodType?: TMethodType) {
    return (
      search?: FilterQuery | TSearchQuery,
      ...args: ComposerMethodArgs
    ): MethodDecorator => {
      return (
        target: any,
        _key?: string | symbol,
        descriptor?: TypedPropertyDescriptor<any>,
      ) => {
        const metadata = {
          method: methodType || search,
          args,
          emitter: listenerType,
        };

        const metadataMethods =
          Reflect.getMetadata(
            MetadataName.LISTENER_METHODS,
            descriptor?.value,
          ) || [];

        Reflect.defineMetadata(
          MetadataName.LISTENER_METHODS,
          [...metadataMethods, metadata],
          descriptor?.value,
        );

        return descriptor;
      };
    };
  }
}
