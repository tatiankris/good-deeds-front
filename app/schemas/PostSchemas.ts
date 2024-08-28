import * as Yup from 'yup'

export const NewPostSchema = Yup.object().shape({
  name: Yup.string().required('Post name is required'),
  description: Yup.string().required('Post description is required'),
})
