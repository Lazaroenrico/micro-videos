import { ClassValidatorFields } from "../../domain/validators/class-validator-field";
import { EntityValidationError } from "../../domain/validators/validation.error";
import { FieldsErrors } from "../../domain/validators/validator-fields-interface";

type Expected =
  | { validator: ClassValidatorFields<any>; data: any }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const valiadated = validator.validate(data);

      if (valiadated) {
        return isValid();
      }
      return assertContainsErrorMessages(validator.errors, received);
    }
  },
});

function assertContainsErrorMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(expected).asymmetricMatch(received);

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `the validation errors  not contain ${JSON.stringify(
            received
          )}.Current: ${JSON.stringify(expected)}`,
      };
}

function isValid() {
  return { pass: true, message: () => "" };
}
