export class PletonDIContainer {
  private _controllers: Map<string, any> = new Map();
  private _injectables: Map<string, any> = new Map();

  constructor() {
  }

  get controllers(): Map<string, any> {
    return this._controllers;
  }

  registerController(name: string, cls: any) {
    this._controllers.set(name, new cls());
  }

  registerInjectable(name: string, cls: any) {
    this._injectables.set(name, new cls());
  }
}