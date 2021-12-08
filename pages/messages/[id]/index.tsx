import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { AdminLayout } from '@layouts/.';
import MessageForm from '@forms/MessageForm';
import { getMessage } from '@data/messages';
import useGetMessage from '@hooks/getMessage';
import usePostMessage from '@hooks/postMessage';

type Props = {
  data: Message;
};

const Message: NextPage<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, reload } = useGetMessage(id as string);
  const { submitData } = usePostMessage();

  if (!data) return null;

  const onSubmit = (data: any) => {
    submitData(data);
    reload();
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
