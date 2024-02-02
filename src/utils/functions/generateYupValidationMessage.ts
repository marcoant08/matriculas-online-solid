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
  const path = e.path ? `O campo ${e.path}` : "O body";

  const typeMessages: Record<string, string> = {
    matches: `${path} está em um formato inválido (esperado: ${e.params.regex})`,
    email: `${path} deve conter um email válido`,
    typeError: `${path} está com tipo inválido (esperado: ${e.params.type})`,
    noUnknown: `${path} contém um campo desconhecido (${e.params.unknown})`,
    oneOf: `${path} contém um valor inválido (permitidos: ${e.params.values})`,
    required: `${path} deve ser enviado`,
    min: `${path} não pode ser menor que ${e.params.min}`,
    max: `${path} não pode ser maior que ${e.params.max}`,
  };

  return typeMessages[e.type] || `${path} ${errorsStr || "deve ser revisado"}`;
};
