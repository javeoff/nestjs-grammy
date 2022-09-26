import { Provider } from '@nestjs/common';

import { ProviderName } from '../enums';
import { IOptions } from '../types';
import { INITIAL_BOT_NAME } from '../utils';
import { getGrammyBotProvider } from './getGrammyBotProvider';

export function getGrammyProviders(options: IOptions): Provider[] {
  const botName = options?.name || INITIAL_BOT_NAME;

  const botProvider = getGrammyBotProvider(botName, options);

  return [
    botProvider,
    {
      provide: ProviderName.OPTIONS,
      useValue: options,
    },
  ];
}
