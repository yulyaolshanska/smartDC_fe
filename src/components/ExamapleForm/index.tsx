import { useForm, SubmitHandler } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Inputs } from './types';
import Form from './style';

export default function ExampleForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    alert('Form has been submitted');

  console.log(watch('example'));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>Field One</div>
      <input defaultValue="test" {...register('example')} />
      <div>Field Two</div>
      <input {...register('exampleRequired', { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </Form>
  );
}
