import { FC, useState } from 'react';
import { ListItem, ListItemText, Collapse, Button, TextField } from '@material-ui/core';
import { DatePicker } from '@components/.';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import usePostEmployee from '@hooks/postEmployee';

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    cursor: 'pointer',
  },
});

type Props = {
  employee: Employee;
};

const EmployeeListItem: FC<Props> = ({ employee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { submitData } = usePostEmployee();
  const classes = useStyles();
  const { handleSubmit, control } = useForm({
    defaultValues: employee,
  });

  const toggleOpen = () => {
    setIsOpen((v) => !v);
  };

  const onSubmit = (data: Employee) => {
    submitData(data);
  };

  return (
    <ListItem alignItems='flex-start' className={classes.root} key={employee.id}>
      <div>
        <ListItemText primary={employee.email} onClick={toggleOpen}></ListItemText>
      </div>
      <div>
        <Collapse unmountOnExit in={isOpen} timeout={300}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='id'
              control={control}
              render={({ field }) => <TextField type='hidden' {...field} />}
            />
            <div>
              <Controller
                name='email'
                control={control}
                render={({ field }) => <TextField type='email' {...field} />}
              />
            </div>

            <DatePicker
              name='birthDate'
              label='BirthDate'
              control={control}
              rules={{ required: true }}
            />
            <DatePicker name='startDate' label='StartDate' control={control} />

            <Button type='submit'>Submit</Button>
          </form>
        </Collapse>
      </div>
    </ListItem>
  );
};

export { EmployeeListItem };
