import { DynamicModule, Module } from '@nestjs/common';

import { getGrammyAsyncProviders, getGrammyProviders } from './providers';
import { IAsyncOptions, IOptions } from './types';

@Module({})
export class GrammyModule {
  public static forRoot(options: IOptions): DynamicModule {
    const providers = getGrammyProviders(options);

    return {
      module: GrammyModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: IAsyncOptions): DynamicModule {
    const providers = getGrammyAsyncProviders(options);

    return {
      module: GrammyModule,
      imports: options.imports,
      providers,
      exports: providers,
    };
  }
}
