import { Provider } from '@nestjs/common';

import { ProviderName } from '../enums';
import { IAsyncOptions, IGrammyOptionsFactory, IOptions } from '../types';
import { INITIAL_BOT_NAME } from '../utils';
import { createGrammyBotProvider } from './factories/createGrammyBotProvider';

export function getGrammyAsyncProviders(options: IAsyncOptions): Provider[] {
  const botName = options?.botName || INITIAL_BOT_NAME;

  const providers: Provider[] = [
    {
      provide: botName,
      useFactory: async (options: IOptions) => createGrammyBotProvider(options),
      inject: [ProviderName.OPTIONS],
    },
  ];

  if (options.useFactory) {
    providers.push({
      provide: ProviderName.OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    });
  }

  if (options.useClass) {
    providers.push({
      provide: ProviderName.OPTIONS,
      useFactory: async (optionsFactory: IGrammyOptionsFactory) =>
        optionsFactory.createGrammyModuleOptions(),
    });
  }

  return providers;
}
