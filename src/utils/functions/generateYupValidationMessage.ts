"use strict";

interface YupException {
  params?: {
    regex?: string;
    type?: string;
    unknown?: string;
    values?: string[];
    min?: number;
    max?: number;
  };
  errors?: string[];
  path?: string;
  type: string;
}

export const generateYupValidationMessage = (e: YupException): string => {
  if (!e.params) throw new Error("Erro de validação");

  const errorsStr = e.errors && e.errors.join(" | ");
  const path = e.path ?? "body";

  const typeMessages: Record<string, string> = {
    matches: `${path} is in an invalid format (expected: ${e.params.regex})`,
    email: `${path} must contain a valid email`,
    typeError: `${path} has an invalid type (expected: ${e.params.type})`,
    noUnknown: `${path} contains an unknown field (${e.params.unknown})`,
    oneOf: `${path} contains an invalid value (allowed: ${e.params.values})`,
    required: `${path} is required`,
    min: `${path} cannot be less than ${e.params.min}`,
    max: `${path} cannot be greater than ${e.params.max}`,
  };

  return typeMessages[e.type] || errorsStr || "must be reviewed";
};
