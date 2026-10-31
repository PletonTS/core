import {Decorator} from "../patterns/decorator";

export const Delete = (path?: string) => Decorator.create("mapping", (set) => {
  set("is", true);
  set("method", "delete");
  set("path", path);
})