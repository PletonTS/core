export class Decorator {
  public static create(symbolName: string, reflectionFunc: (set: (key: string, value: any) => void) => any) {
    return (target: any, propertyName?: any, descriptor?: any) => {
      reflectionFunc((k, v) => {
        (descriptor ? descriptor.value : target)[Symbol.for(`pleton.${symbolName}.${k}`)] = v;
      });
    }
  }

  public static getValue(target: any, symbolName: string, key: string) {
    const symbol = Symbol.for(`pleton.${symbolName}.${key}`)

    return target[symbol];
  }
}