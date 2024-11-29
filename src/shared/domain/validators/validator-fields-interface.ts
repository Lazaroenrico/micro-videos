// formata o erro
export type FieldsErros = {
  [field: string]: string[];
};

export interface IValidatorFields<PropsValidated> {
  errors: FieldsErros | null;
  validatedData: PropsValidated | null;
  validate(data: any): boolean;
}
