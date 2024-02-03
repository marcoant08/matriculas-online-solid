import * as yup from "yup";
import ValidationException from "../exceptions/validation.exception";
import { generateYupValidationMessage } from "../functions/generateYupValidationMessage";

export const validateUpdateStudentRequest = async ({
  body,
  params: { path },
}: any) => {
  // validação de id
  if (!path.studentId) throw new ValidationException("studentId is missing");

  // validação de body
  const schema = yup.object().required().noUnknown().shape({
    name: yup.string().notRequired(),
    email: yup.string().notRequired().email(),
  });

  try {
    await schema.strict().validate(body);
  } catch (e: any) {
    const message = generateYupValidationMessage(e);
    throw new ValidationException(message);
  }
};
