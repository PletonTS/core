import {Decorator} from "../patterns/decorator";

export const Get = (path?: string) => Decorator.create("mapping", (set) => {
  set("is", true);
  set("method", "get");
  set("path", path);
})