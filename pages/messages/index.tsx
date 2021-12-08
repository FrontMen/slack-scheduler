import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { AdminLayout } from '@layouts/.';
import useGetAllMessages from '@hooks/getAllMessages';

import { List, ListItem, ListItemText, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { getAllMessages } from '@data/messages';

type Props = {
  data: Message[];
};

const Home: NextPage<Props> = ({ data }) => {
  return (
    <AdminLayout>
      <h2>Messages</h2>
      <Link href='/messages/new'>
        <Fab color='primary' aria-label='add'>
          <Add />
        </Fab>
      </Link>

      <List component='ul'>
        {data.map((message) => (
          <Link key={message.id} href={`/messages/${message.id}`}>
            <ListItem button>
              <ListItemText primary={message.title} secondary='Jan 9, 2014' />
            </ListItem>
          </Link>
        ))}
      </List>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllMessages();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
};

export default Home;
