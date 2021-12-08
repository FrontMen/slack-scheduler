import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { format } from 'date-fns';

type Props = {
  control: any;
  rules?: any;
  name: string;
  label: string;
};

const DatePicker: FC<Props> = ({ control, rules, name, label }) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const formatedDate = field.value ? format(new Date(field.value), 'yyyy-MM-dd') : '';
          const newField = { ...field, value: formatedDate };

          return <TextField type='date' {...newField} label={label} />;
        }}
      />
    </div>
  );
};

export { DatePicker };
