import { NextPage } from "next";
import Head from "next/head";

import SignUp from "components/pages/SignUp";

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
