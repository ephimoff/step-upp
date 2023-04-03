import * as yup from 'yup';

// export const profileSchema = yup.object().shape({
//   name: yup.string().required('Required'),
//   email: yup.string().email('Please enter a valid email').required('Required'),
//   slug: yup
//     .string()
//     .required('Required')
//     .test(
//       'Unique slug',
//       'Slug is already in use. Change it or generate a new one',
//       async (value, slug) => {
//         const { status } = await fetch(
//           `/api/slug?slug=${value}&email=${slug.parent.email}`
//         );
//         return status === 200 ? true : false;
//       }
//     ),
//   phone: yup.string(),
//   twitter: yup.string(),
//   linkedin: yup.string().url('The field must be a valid URL'),
//   github: yup.string(),
// });

export const scoreSchema = yup.object().shape({
  score: yup.number().positive().integer().min(0).max(10),
});

export const emailSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
});
export const companyNameSchema = yup.object().shape({
  name: yup.string().required('Required'),
});
