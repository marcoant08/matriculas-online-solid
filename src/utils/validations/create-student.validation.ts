import * as yup from "yup";
import ValidationException from "../exceptions/validation.exception";
import { generateYupValidationMessage } from "../functions/generateYupValidationMessage";

export const validateCreateStudentRequest = async ({ body }: any) => {
  // validação de body
  const schema = yup
    .object()
    .required()
    .noUnknown()
    .shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      academicRecord: yup.string().required(),
      documentNumber: yup
        .string()
        .required()
        .matches(/^\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    });

  try {
    await schema.strict().validate(body);
  } catch (e: any) {
    const message = generateYupValidationMessage(e);
    throw new ValidationException(message);
  }
};
