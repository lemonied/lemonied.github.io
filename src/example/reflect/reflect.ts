import 'reflect-metadata';

interface Constructor<T=any> {
  new (...args: any[]): T;
}

const Injectable = (): ClassDecorator => target => {};

@Injectable()
class OtherService {
  public method() {
    return 'this is other service';
  }
}

@Injectable()
class AbilityService {
  constructor(
    private other: OtherService,
  ) {}
  public speak() {
    return `${this.other.method()} and 汪汪汪`;
  }
}

@Injectable()
class DogService {
  constructor(
    private abilities: AbilityService,
  ) {}
  public speak() {
    return this.abilities.speak();
  }
}

export { DogService };

export function factory<T>(target: Constructor<T>): T {
  const providers = Reflect.getMetadata('design:paramtypes', target) || [];
  const args = providers.map((provider: Constructor) => factory(provider));
  return new target(...args);
}
