import { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, MessageExample } from '@components/.';
import { TextField, Button, Select } from '@mui/material';
import { messageType } from 'utils/constants';

type Props = {
  data: Message;
  onSubmit: (data: Message) => void;
};

const MessageForm: FC<Props> = ({ onSubmit, data }) => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: data,
  });
  const watchAllFields = watch();

  useEffect(() => {
    console.log(watchAllFields);
  }, [watchAllFields]);

  return (
    <>
      <MessageExample message={watchAllFields} />
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
        <DatePicker name='plannedSendDate' label='Planned Send Date' control={control} />

        <div>
          <Controller
            name='messageType'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} label='Type'>
                <option value={messageType.NEWEMPLOYEE}>New Employee</option>
                <option value={messageType.BIRTHDAY}>Birthday</option>
                <option value={messageType.PHOTOEVENT}>Event with photos</option>
                <option value={messageType.TRANSFER}>Transfermarket</option>
                <option value={messageType.WORKANNIVERSARY}>Work anniversary</option>
              </Select>
            )}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
};

export default MessageForm;
