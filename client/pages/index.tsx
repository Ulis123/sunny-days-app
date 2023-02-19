import { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getToken } from "next-auth/jwt";
import { AxiosError } from "axios";

import Home from "components/pages/Home";
import { serverRequests } from "requests";
import { AppPages, ILocationWithWeather } from "types";

interface HomeProps {
  locations?: ILocationWithWeather[];
}

const HomePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ locations }) => {
  return (
    <>
      <Head>
        <title>Sunny Days</title>
      </Head>

      <Home locations={locations} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req, res }) => {
  try {
    const token = await getToken({ req });

    const locations = await serverRequests.getAllLocations(token?.accessToken as string);

    return {
      props: { locations },
    };
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      res.writeHead(301, { Location: AppPages.SIGN_IN });
      res.end();
    }
    return {
      props: {},
    };
  }
};

export default HomePage;
