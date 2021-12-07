import type { NextPage } from 'next';
import Link from 'next/link';
import { AdminLayout } from '@layouts/.';
import useGetAllMessages from '@hooks/getAllMessages';

import { List, ListItem, ListItemText } from '@material-ui/core';

const Home: NextPage = () => {
  const { data } = useGetAllMessages();

  return (
    <AdminLayout>
      <h2>Messages</h2>

      <List component='ul'>
        {data.map((message) => (
          <Link key={message.id} href={`/messages/${message.id}`}>
            <ListItem button>
              <ListItemText primary={message.title} secondary='Jan 9, 2014' />
            </ListItem>
          </Link>
        ))}
      </List>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Home;
