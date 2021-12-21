import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MessageExample } from '@components/.';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { messageType } from 'utils/constants';

type Props = {
  data: Message;
  onSubmit: (data: Message) => void;
};

const MessageForm: FC<Props> = ({ onSubmit, data }) => {
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: data,
  });
  const watchAllFields = watch();

  return (
    <>
      <MessageExample message={watchAllFields} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' {...register('id')} />
        <div>
          <TextField {...register('title')} label='Title' required={true} />
        </div>

        <div>
          <TextField {...register('text')} label='Text' />
        </div>
        <TextField type='date' {...register('plannedSendDate')} label='Planned Send Date' />

        <div>
          <Select
            {...register('messageType')}
            required={true}
            label='Type'
            defaultValue={data.messageType}
          >
            <MenuItem value={undefined}>Select a type</MenuItem>
            <MenuItem value={messageType.NEWEMPLOYEE}>New Employee</MenuItem>
            <MenuItem value={messageType.PHOTOEVENT}>Event with photos</MenuItem>
            <MenuItem value={messageType.TRANSFER}>Transfermarket</MenuItem>
            <MenuItem value={messageType.WORKANNIVERSARY}>Work anniversary</MenuItem>
          </Select>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
};

export default MessageForm;
