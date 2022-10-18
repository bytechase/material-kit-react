import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
const Page = () => (
  <>
    <Head>
      <title>COP Group</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Typography>Index</Typography>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a>Sign Up</a>
        </Link>
      </Container>
    </Box>
  </>
);

export default Page;
