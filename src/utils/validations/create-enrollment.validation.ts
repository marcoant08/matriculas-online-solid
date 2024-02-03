import * as yup from "yup";
import ValidationException from "../exceptions/validation.exception";
import { generateYupValidationMessage } from "../functions/generateYupValidationMessage";

export const validateCreateEnrollmentRequest = async ({ body }: any) => {
  // validação de body
  const schema = yup.object().required().noUnknown().shape({
    studentId: yup.string().required().uuid(),
    classroomId: yup.string().required().uuid(),
  });

  try {
    await schema.strict().validate(body);
  } catch (e: any) {
    const message = generateYupValidationMessage(e);
    throw new ValidationException(message);
  }
};
