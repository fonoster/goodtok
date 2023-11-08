export function getFieldError(zodError: any, fieldName: string) {
  return zodError.fieldErrors[fieldName]?.[0];
}
