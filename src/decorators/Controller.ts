import {Decorator} from "../patterns/decorator";

export const Controller = (baseUrl: string) => Decorator.create("controller", (set) => {
  set("is", true);
  set("path", baseUrl);
})