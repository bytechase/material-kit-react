import Head from "next/head";
// MUI
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
// Components
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { DashboardLayout } from "../../components/dashboard-layout";
import { DiscordAccountProfileDetails } from "../../components/account/discord-account-profile-details";
import { AccountPayoutDetails } from "../../components/account/account-payout-details";
// React Hooks
import { useUser } from "@supabase/auth-helpers-react";

const Page = () => {
  const user = useUser();
  return (
    <>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          {user && (
            <Grid2 container spacing={3}>
              {/* Account Profile */}
              <Grid2 item lg={6} md={6} xs={12}>
                <Stack spacing={3}>
                  <AccountProfile user={user} />
                  {/* Account Payout Details */}
                  <AccountPayoutDetails user={user} />
                </Stack>
              </Grid2>
              {/* Account Details */}
              <Grid2 item lg={6} md={6} xs={12}>
                {user.app_metadata.provider == "discord" ? (
                  <DiscordAccountProfileDetails user={user} />
                ) : (
                  <AccountProfileDetails user={user} />
                )}
              </Grid2>
            </Grid2>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
