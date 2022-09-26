import { Injectable } from '@nestjs/common';
import { ModulesContainer, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';

import { MetadataName } from '../enums';
import { ListenersFactory } from '../factories/ListenersFactory';

@Injectable()
export class ListenersGetter {
  private listenersFactory = new ListenersFactory();

  public constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly reflector: Reflector,
  ) {}

  public getListeners(): InstanceWrapper[] {
    const listeners: InstanceWrapper[] = [];
    const modules = this.getModules();

    modules.forEach((module) => {
      listeners.push(...this.getModuleListeners(module));
    });

    return listeners;
  }

  private getModules(): Module[] {
    return Array.from(this.modulesContainer.values());
  }

  private getModuleListeners(
    module: Module,
    foundListeners: InstanceWrapper[] = [],
  ): InstanceWrapper[] {
    const providers = this.getModuleProviders(module);
    const listeners = this.filterProvidersListeners(providers);
    const imports = this.getModuleImports(module);

    const uniqueListeners = this.listenersFactory.getUniqueListeners(
      ...listeners,
    );
    const uniqueProviders = this.listenersFactory.getUniqueListeners(
      ...providers,
    );

    foundListeners.push(...uniqueListeners, ...uniqueProviders);

    if (imports.length > 0) {
      imports.forEach((importModule) => this.getModuleListeners(importModule));
    }

    return foundListeners;
  }

  private filterProvidersListeners(
    providers: InstanceWrapper[],
  ): InstanceWrapper[] {
    return providers.filter(({ instance, metatype }) => {
      const isListener = this.reflector.get(MetadataName.LISTENER, metatype);

      if (instance && isListener) {
        return true;
      }

      return false;
    });
  }

  private getModuleProviders(module: Module): InstanceWrapper[] {
    if (module.providers.size === 0) {
      return [];
    }

    const moduleProviders = module.providers.values() || [];

    return Array.from(moduleProviders);
  }

  private getModuleImports(module: Module): Module[] {
    if (module.imports.size === 0) {
      return [];
    }

    const moduleImports = module.imports.values() || [];

    return Array.from(moduleImports);
  }
}
