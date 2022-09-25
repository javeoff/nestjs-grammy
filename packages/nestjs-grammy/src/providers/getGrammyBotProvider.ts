import { Provider } from '@nestjs/common';

import { IOptions } from '../types';
import { createGrammyBotProvider } from './factories/createGrammyBotProvider';

export function getGrammyBotProvider(
  botName: string,
  options: IOptions,
): Provider {
  return {
    provide: botName,
    useFactory: async () => await createGrammyBotProvider(options),
  };
}
