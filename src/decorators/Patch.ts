import {Decorator} from "../patterns/decorator";

export const Patch = (path?: string) => Decorator.create("mapping", (set) => {
  set("is", true);
  set("method", "patch");
  set("path", path);
})