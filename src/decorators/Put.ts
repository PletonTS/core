import {Decorator} from "../patterns/decorator";

export const Put = (path?: string) => Decorator.create("mapping", (set) => {
  set("is", true);
  set("method", "put");
  set("path", path);
})