import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { AdminLayout } from '@layouts/.';
import usePostMessage from '@hooks/postMessage';
import MessageForm from '@forms/MessageForm';
import { getMessage } from '@data/messages';
import useGetMessage from '@hooks/getMessage';

type Props = {
  data: Message;
};

const Message: NextPage<Props> = () => {
  const router = useRouter();
  const { submitData } = usePostMessage();
  const data = {
    text: '',
    title: '',
  };

  const onSubmit = async (data: any) => {
    const id = await submitData(data);
    router.push(`/messages/${id}`);
  };

  return (
    <AdminLayout>
      <h2>Message</h2>

      <MessageForm onSubmit={onSubmit} data={data} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Message;
