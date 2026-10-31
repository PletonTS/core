import {Decorator} from "../patterns/decorator";

export const Application = () => Decorator.create("application", () => true)
