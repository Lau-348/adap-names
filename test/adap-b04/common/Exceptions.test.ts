import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailureException } from "../../../src/adap-b04/common/MethodFailureException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {
    const exMsg: string = "null or undefined";

    IllegalArgumentException.assert("hurray!" != null);
    expect(() => IllegalArgumentException.assert(false, m)).toThrow(new IllegalArgumentException(m));

    MethodFailureException.assert("hurray!" != null);
    expect(() => MethodFailureException.assert(false, m)).toThrow(new MethodFailureException(m));

    InvalidStateException.assert("hurray!" != null);
    expect(() => InvalidStateException.assert(false, m)).toThrow(new InvalidStateException(m));
  });
});
