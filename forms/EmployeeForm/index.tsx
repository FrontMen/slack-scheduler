import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

type Props = {
  data: Employee;
  onSubmit: (data: Employee) => void;
};

const EmployeeForm: FC<Props> = ({ onSubmit, data }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='id'
        control={control}
        render={({ field }) => <input type='hidden' {...field} />}
      />
      <div>
        <TextField {...register('email')} label='Email' />
      </div>
      <div>
        <TextField type='date' {...register('birthDate')} label='Birthday' />
      </div>

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default EmployeeForm;
