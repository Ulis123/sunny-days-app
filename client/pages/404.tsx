import { NextPage } from "next";
import Head from "next/head";

import { Box, Typography } from "@mui/material";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 error</title>
      </Head>
      <section>
        <Box sx={{ my: "100px" }}>
          <Typography variant="h3" align="center">
            404 - This page doesn&rsquo;t exist
          </Typography>
        </Box>
      </section>
    </>
  );
};

export default Custom404;
