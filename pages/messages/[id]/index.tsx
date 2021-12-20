import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { AdminLayout } from '@layouts/.';
import MessageForm from '@forms/MessageForm';
import useGetMessage from '@hooks/getMessage';
import usePostMessage from '@hooks/postMessage';

type Props = {
  data: Message;
};

const Message: NextPage<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log({ id });
  const { data, reload } = useGetMessage(id as string);
  const { submitData } = usePostMessage();

  if (!data && id !== 'new') return null;

  const onSubmit = async (data: any) => {
    const newId = await submitData(data);

    if (id === 'new') {
      router.push(`/messages/${newId}`);
    }
    reload(newId);
  };

  return (
    <AdminLayout>
      <h2>Message</h2>

      <MessageForm onSubmit={onSubmit} data={data ? data : ({} as Message)} />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Message;
