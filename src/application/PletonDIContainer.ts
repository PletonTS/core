import {Decorator} from "../patterns/decorator";

// A token stands in for an interface, which has no runtime value.
// __type is never set, it only carries T.
export interface Token<T> {
  readonly description: string;
  readonly __type?: T;
}

export type InjectionKey<T> = (abstract new (...args: any[]) => T) | Token<T>;

export const injectable = <T>(description: string): Token<T> => ({description});

let current: PletonDIContainer | undefined;

export function inject<T>(key: InjectionKey<T>): T {
  if (!current) throw new Error("inject() can only be used in field initializers or constructors of Pleton-managed classes");
  return current.resolve(key);
}

const keyName = (key: InjectionKey<any>) => "description" in key ? key.description : key.name;

export class PletonDIContainer {
  private _controllers: Map<string, any> = new Map();
  private providers: Map<InjectionKey<any>, any> = new Map(); // key -> implementing class
  private instances: Map<any, any> = new Map(); // class -> singleton
  private constructing: Set<any> = new Set();

  get controllers(): Map<string, any> {
    return this._controllers;
  }

  registerController(name: string, cls: any) {
    this._controllers.set(name, this.construct(cls));
  }

  registerInjectable(name: string, cls: any) {
    for (const key of [cls, ...(Decorator.getValue(cls, "injectable", "provides") ?? [])]) {
      const existing = this.providers.get(key);
      if (existing) throw new Error(`${keyName(key)} is provided by both ${existing.name} and ${cls.name}`);
      this.providers.set(key, cls);
    }
  }

  resolve<T>(key: InjectionKey<T>): T {
    const cls = this.providers.get(key);
    if (!cls) throw new Error(`No @Injectable provides ${keyName(key)}`);

    if (!this.instances.has(cls)) this.instances.set(cls, this.construct(cls));
    return this.instances.get(cls);
  }

  private construct(cls: any) {
    if (this.constructing.has(cls))
      throw new Error(`Circular dependency: ${[...this.constructing, cls].map((c) => c.name).join(" -> ")}`);

    const previous = current;
    current = this;
    
    this.constructing.add(cls);
    try {
      return new cls();
    } finally {
      current = previous;
      this.constructing.delete(cls);
    }
  }
}
