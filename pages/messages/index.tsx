import { FC } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { AdminLayout } from '@layouts/.';
import { Fab } from '@components/.';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useGetAllMessages from '@hooks/getAllMessages';
import { deleteMessage } from '@data/messages';

const Home: NextPage = () => {
  const router = useRouter();
  const { data, reload } = useGetAllMessages();

  const handleStartNew = () => {
    router.push('/messages/new');
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(id);
      reload();
    }
  };

  return (
    <AdminLayout>
      <h2>Messages</h2>

      <Fab onClick={handleStartNew} aria-label='add'>
        <Add />
      </Fab>

      <List component='ul'>
        {data.map((message) => (
          <ListItem
            key={message.id}
            button
            secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick={() => handleDelete(message.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>{message.messageType}</ListItemAvatar>
            <Link href={`/messages/${message.id}`}>
              <ListItemText
                primary={message.title}
                secondary={<SecondaryItem message={message} />}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </AdminLayout>
  );
};

type SecondaryProps = {
  message: Message;
};

const SecondaryItem: FC<SecondaryProps> = ({ message }) => {
  return (
    <div>
      <Typography variant='subtitle1'>planned: {message.plannedSendDate}</Typography>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Home;
