import { IOptions } from './IOptions';

export interface IGrammyOptionsFactory {
  createGrammyModuleOptions(): Promise<IOptions> | IOptions;
}
