import {Decorator} from "../patterns/decorator";

export const Post = (path?: string) => Decorator.create("mapping", (set) => {
  set("is", true);
  set("method", "post");
  set("path", path);
})