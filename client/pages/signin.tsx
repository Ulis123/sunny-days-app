import { NextPage } from "next";
import Head from "next/head";

import SignIn from "components/pages/SignIn";

const SignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <SignIn />
    </>
  );
};

export default SignInPage;
