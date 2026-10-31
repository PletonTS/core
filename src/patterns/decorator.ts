export class Decorator {
  public static create(symbolName: string, reflectionFunc: () => any) {
    const symbol = Symbol.for(`pleton.${symbolName}`);

    return (target: any) => {
      target[symbol] = reflectionFunc();
    }
  }

  public static getValue(target: any, symbolName: string) {
    const symbol = Symbol.for(`pleton.${symbolName}`)

    return target[symbol];
  }
}