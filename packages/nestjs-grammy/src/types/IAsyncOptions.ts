/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleMetadata, Type } from '@nestjs/common';

import { IGrammyOptionsFactory } from './IGrammyOptionsFactory';
import { IOptions } from './IOptions';

export interface IAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  botName?: string;
  useClass?: Type<IGrammyOptionsFactory>;
  useFactory?(...args: any[]): Promise<IOptions> | IOptions;
  inject?: any[];
}
