import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { AdminLayout } from '@layouts/.';
import { Fab } from '@components/.';
import { List, ListItem, ListItemText } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useGetAllMessages from '@hooks/getAllMessages';

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = useGetAllMessages();

  const handleStartNew = () => {
    router.push('/messages/new');
  };

  return (
    <AdminLayout>
      <h2>Messages</h2>

      <Fab onClick={handleStartNew} aria-label='add'>
        <Add />
      </Fab>

      <List component='ul'>
        {data.map((message) => (
          <Link key={message.id} href={`/messages/${message.id}`}>
            <ListItem button>
              <ListItemText primary={message.title} secondary={message.plannedSendDate} />
            </ListItem>
          </Link>
        ))}
      </List>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Home;
