import { Bot } from 'grammy';
import { Context } from 'grammy/out/context';

import { IOptions } from '../../types';

export async function createGrammyBotProvider<BotContext extends Context>({
  token,
  options,
}: IOptions): Promise<Bot<BotContext>> {
  const bot = new Bot<BotContext>(token, options);

  if (!bot.isInited()) {
    await bot.init();
  }

  return bot;
}
