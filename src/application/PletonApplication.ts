import {PletonHttp} from "@pleton/http"
import {Decorator} from "../patterns/decorator";
import {joinURL} from "../utils/URL";
import {PletonDIContainer} from "./PletonDIContainer";

export abstract class PletonApplication {
  protected readonly http = new PletonHttp();
  protected readonly di = new PletonDIContainer();

  public async init(controllers: [string, any][]) {
    this.registerControllers(controllers);
    this.initRouter()

    void this.run()
  }

  abstract run(): Promise<void>;

  private registerControllers(controllers: [string, any][]) {
    for (const [name, controller] of controllers) {
      this.di.registerController(name, controller);
    }
  }

  private initRouter() {
    for (const [name, controller] of this.di.controllers) {
      const cls = controller.constructor;

      const controllerPath = Decorator.getValue(cls, "controller", "path");
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(controller)).map((prop) => [prop, controller[prop]]);
      const mappings = methods.filter(([name, fun]) => name !== "constructor" && typeof fun === "function" && Decorator.getValue(fun, "mapping", "is"));

      for (const [_, method] of mappings) {
        const mappingPath = Decorator.getValue(method, "mapping", "path");
        const fullPath = joinURL(controllerPath, mappingPath)
        const mappingMethod = Decorator.getValue(method, "mapping", "method");

        this.http._mapRoute(fullPath, mappingMethod, method.bind(controller));
      }
    }
  }
}
