import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import UserAvatarWithMenu from "../UserAvatarWithMenu";
import { appBar, toolBar, userAvatarWrapper } from "./styles";
import { AppPages } from "types";

const Header: FC = () => {
  const { data, status } = useSession();
  return (
    <AppBar position="static" sx={appBar}>
      <Container>
        <Toolbar disableGutters sx={toolBar}>
          <Link href={AppPages.HOME}>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>

          {status === "authenticated" && (
            <Box sx={userAvatarWrapper}>
              <Typography>{data?.user?.email}</Typography>

              <UserAvatarWithMenu />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
