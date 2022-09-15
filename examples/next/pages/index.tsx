import { fetchAddresses } from '@jp-postal-code/api-client';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BasicAddressForm from '../components/forms/basic-address-form';
import WithReactHookForm from '../components/forms/with-react-hook-form';

interface Props {
  initialValue: {
    postalCode: string;
    address1: string;
  };
}

const Home: NextPage<Props> = ({ initialValue }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Example</title>
        <meta name="description" content="@jp-postal-code/react example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BasicAddressForm initialValue={initialValue} />

        <WithReactHookForm initialValue={initialValue} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // 初期値のサンプル
  const [address] = await fetchAddresses('1000001');

  return {
    props: {
      initialValue: {
        postalCode: address.postalCode,
        address1: `${address.region}${address.locality}${address.address1}${address.address2}`,
      },
    },
  };
};
