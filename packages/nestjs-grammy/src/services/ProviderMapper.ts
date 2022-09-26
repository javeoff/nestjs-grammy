import { Injectable } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class ProviderMapper {
  public constructor(private readonly metadataScanner: MetadataScanner) {}

  public mapMethods(
    provider: InstanceWrapper,
    predicate: (
      instance: Record<string, unknown>,
      prototype: Record<string, unknown>,
      methodName: string,
    ) => void,
  ): void {
    const { instance } = provider;
    const prototype = Object.getPrototypeOf(provider);

    this.metadataScanner.scanFromPrototype(instance, prototype, (name) =>
      predicate(instance, prototype, name),
    );
  }
}
