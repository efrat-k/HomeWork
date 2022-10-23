import { customer } from "./custumer.model";
import { disease } from "./disease";
import { vaccination } from "./vaccination";

export class customerAll {
    constructor(
      public customer?:customer,
      public diease : disease[]=[],
      public vecAll:vaccination[]=[]
            
    ) { }
  }