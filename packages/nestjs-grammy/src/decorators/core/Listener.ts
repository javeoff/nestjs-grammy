import { MetadataName } from '../../enums';

export function Listener() {
  return (target: object): void => {
    Reflect.defineMetadata(MetadataName.LISTENER, true, target);
  };
}
