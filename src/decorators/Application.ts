import {Decorator} from "../patterns/decorator";

export const Application = () => Decorator.create("application", (set) => {
  set("is", true)
})
