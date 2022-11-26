import * as yup from 'yup';

export const pictureValidator = yup
  .object()
  .shape({
    year: yup.string().max(4).required(),
    photo: yup.string().max(100).required(),
    category: yup.string().required(),
    artist: yup.string().max(100).required(),
  })
  .required();
