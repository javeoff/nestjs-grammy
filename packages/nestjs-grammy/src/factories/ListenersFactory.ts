import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export class ListenersFactory {
  private listenerNames: Set<string> = new Set();

  public getUniqueListeners(
    ...listeners: InstanceWrapper[]
  ): InstanceWrapper[] {
    const listenerNames = new Set(Array.from(this.listenerNames));

    const uniqueListeners = listeners.filter(
      (listener) => !listenerNames.has(listener.name),
    );

    this.add(...listeners);

    return uniqueListeners;
  }

  private add(...listeners: InstanceWrapper[]): void {
    listeners.forEach((listener) => {
      this.listenerNames.add(listener.name);
    });
  }
}
