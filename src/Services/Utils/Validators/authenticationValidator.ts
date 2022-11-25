import * as yup from 'yup';

export const authValidator = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(20).required(),
  })
  .required();
