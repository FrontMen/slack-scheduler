import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { TextField, Button } from '@material-ui/core';

type Props = {
  data: Message;
  onSubmit: (data: Message) => void;
};

const MessageForm: FC<Props> = ({ onSubmit, data }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='id'
        control={control}
        render={({ field }) => <TextField type='hidden' {...field} />}
      />
      <div>
        <Controller
          name='title'
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label='Title' />}
        />
      </div>

      <div>
        <Controller
          name='text'
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label='Text' />}
        />
      </div>

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default MessageForm;
