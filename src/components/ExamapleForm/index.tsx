import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from './types';

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

  //inline style only for demonstration purposes

  return (
    <form style={{ backgroundColor: 'red' }} onSubmit={handleSubmit(onSubmit)}>
      <div>Field One</div>
      <input defaultValue="test" {...register('example')} />
      <div>Field Two</div>
      <input {...register('exampleRequired', { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
