import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { MetadataName, ProviderName } from '../enums';
import { IOptions, TListenerMetadata, TUnknownFunction } from '../types';
import { BotLoader } from './BotLoader';
import { ListenerCallbackCreator } from './ListenerCallbackCreator';
import { ListenersGetter } from './ListenersGetter';
import { ProviderMapper } from './ProviderMapper';

@Injectable()
export class GrammyLoader implements OnModuleInit {
  public constructor(
    @Inject(ProviderName.OPTIONS)
    private readonly options: IOptions,
    private readonly listenersGetter: ListenersGetter,
    private readonly providerMapper: ProviderMapper,
    private readonly reflector: Reflector,
    private readonly listenerCallbackCreator: ListenerCallbackCreator,
    private readonly botLoader: BotLoader,
  ) {}

  public onModuleInit(): void {
    const listeners = this.listenersGetter.getListeners();

    listeners.forEach((listener) => {
      this.providerMapper.mapMethods(listener, this.registerListener);
    });

    void this.botLoader.load();
  }

  public registerListener(
    instance: Record<string, unknown>,
    prototype: Record<string, unknown>,
    methodName: string,
  ): void {
    const methodRef = prototype[methodName] as TUnknownFunction;
    const metadata: TListenerMetadata = this.reflector.get(
      MetadataName.LISTENER_METHODS,
      methodRef,
    );

    if (!metadata?.length) {
      return;
    }

    const listenerCallback = this.listenerCallbackCreator.create(
      instance,
      methodRef,
      methodName,
    );

    for (const { method, emitter } of metadata) {
      this.botLoader.bot[emitter](method, listenerCallback);
    }
  }
}
