import { NextPage } from "next";
import Head from "next/head";

import { Box, Typography } from "@mui/material";

const Custom500: NextPage = () => {
  return (
    <>
      <Head>
        <title>500 error</title>
      </Head>
      <section>
        <Box sx={{ my: "100px" }}>
          <Typography variant="h3" align="center">
            500 - Server-side error occurred
          </Typography>
        </Box>
      </section>
    </>
  );
};

export default Custom500;
