import {Decorator} from "../patterns/decorator";
import {InjectionKey} from "../application/PletonDIContainer";

export const Injectable = (...provides: InjectionKey<any>[]) => Decorator.create("injectable", (set) => {
  set("is", true);
  set("provides", provides);
})
