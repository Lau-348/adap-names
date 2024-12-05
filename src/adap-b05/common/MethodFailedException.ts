import { Exception } from "./Exception";

/**
 * A MethodFailedException signals that the method failed to provide its service.
 * In other words, a postcondition failed.
 */
export class MethodFailedException extends Exception {
  
    public static assert(c: boolean, m: string = "method failed", t?: Exception): void {
        if (!c) throw new MethodFailedException(m);
    }

    constructor(m: string) {
        super(m);
    }
    
}
