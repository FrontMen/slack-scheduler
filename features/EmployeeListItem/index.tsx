import { FC, useState } from 'react';
import { ListItem, ListItemText, Collapse } from '@mui/material';
import EmployeeForm from '@forms/EmployeeForm';
import { makeStyles } from '@mui/styles';
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
          <EmployeeForm onSubmit={onSubmit} data={employee} />
        </Collapse>
      </div>
    </ListItem>
  );
};

export { EmployeeListItem };
