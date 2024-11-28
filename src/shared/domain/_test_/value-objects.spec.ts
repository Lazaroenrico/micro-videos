import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly props1: string, readonly props2: number) {
    super();
  }
}

describe("ValueObject Unit Test", () => {
  test("should be equals", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test");

    const complexObject1 = new ComplexValueObject("teste", 1);
    const complexObject2 = new ComplexValueObject("teste", 1);

    expect(valueObject1.equals(valueObject2)).toBe(true);
    expect(complexObject1.equals(complexObject2)).toBe(true);
  });

  test("should not be equals", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("tes");

    const complexObject1 = new ComplexValueObject("teste", 1);
    const complexObject2 = new ComplexValueObject("teste", 2);

    expect(valueObject1.equals(valueObject2)).toBe(false);
    expect(complexObject1.equals(complexObject2)).toBe(false);
  });
});
