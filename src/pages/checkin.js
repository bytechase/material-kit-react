import Head from "next/head";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2

import { customers } from "../__mocks__/customers";
import { DashboardLayout } from "../components/dashboard-layout";
import { CheckInListResults } from "../components/check-in/check-in-list-results";
import { CheckInListToolbar } from "../components/check-in/check-in-list-toolbar";
import { UnlinkedItemsResults } from "../components/check-in/unlinked-items-results";

const Page = () => {
  const [checkInState, setCheckInState] = useState("items");

  const handleButtonGroup = (event, buttonValue) => {
    setCheckInState(buttonValue);
  };
  return (
    <>
      <Head>
        <title>Check In | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CheckInListToolbar checkinstate={checkInState} handlebuttongroup={handleButtonGroup} />
          <Grid2 container spacing={2} pt={3}>
            <Grid2 md={6} sm={6} xs={12}>
              <CheckInListResults customers={customers} />
            </Grid2>
            <Grid2 md={6} sm={6} xs={12}>
              <UnlinkedItemsResults customers={customers} />
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
