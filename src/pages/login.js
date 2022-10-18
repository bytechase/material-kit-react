import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const Login = () => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const user = useUser();

  useEffect(() => {
    console.log(`useEffect isLoading: ${isLoading}`);
  }, [isLoading]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      provider: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async ({ email, password }) => {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
        provider,
      });
      if (!error) {
        console.log("Signed In");
        console.log(user);
        Router.push("/").catch(console.error);
      } else {
        console.error(error);
      }
    },
  });
  console.log(
    `isLoading: ${isLoading}\nsession: ${session}\nerror: ${error}\nsupabaseClient: ${JSON.stringify(
      supabaseClient
    )}\n`
  );
  async function signInWithDiscord() {
    await supabaseClient.auth.signInWithOAuth({
      provider: "discord",
      redirectTo: "/dashboard/account",
    });
  }
  if (user) {
    Router.push("/dashboard/account");
  }
  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in to COP
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  startIcon={<FacebookIcon />}
                  onClick={() => signInWithDiscord()}
                  size="large"
                  variant="contained"
                  sx={{ px: 3, backgroundColor: "rgb(88,101,242)" }}
                >
                  Login with Discord
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
