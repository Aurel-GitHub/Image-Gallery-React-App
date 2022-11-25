import * as yup from 'yup';

export const signinValidator = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(20).required(),
  })
  .required();

export const signupValidator = yup
  .object()
  .shape({
    firstname: yup.string().min(5).max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(20).required(),
  })
  .required();
