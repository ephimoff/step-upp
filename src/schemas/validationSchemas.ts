import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  slug: yup.string().required('Required'),
  phone: yup.string(),
  twitter: yup.string().url('The field must be a valid URL'),
  linkedin: yup.string().url('The field must be a valid URL'),
  github: yup.string().url('The field must be a valid URL'),
});
export const scoreSchema = yup.object().shape({
  score: yup.number().positive().integer().min(0).max(10),
});
