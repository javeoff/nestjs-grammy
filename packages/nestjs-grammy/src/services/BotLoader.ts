import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Bot } from 'grammy';

import { ProviderName } from '../enums';
import { IOptions } from '../types';
import { TContext } from '../types/TContext';
import { INITIAL_BOT_NAME } from '../utils';

@Injectable()
export class BotLoader {
  public bot: Bot<TContext>;

  public constructor(
    @Inject(ProviderName.OPTIONS)
    private readonly options: IOptions,
    private readonly moduleRef: ModuleRef,
  ) {
    const botName = this.options.name || INITIAL_BOT_NAME;

    this.bot = this.moduleRef.get<Bot<TContext>>(botName, {
      strict: false,
    });
  }

  public load(): Promise<void> {
    return this.bot.start();
  }
}
