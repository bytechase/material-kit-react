import Head from "next/head";
import React, { useState } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { customers } from "../__mocks__/customers";
import { DashboardLayout } from "../components/dashboard-layout";
import { CheckInListResults } from "../components/check-in/check-in-list-results";
import { CheckInListToolbar } from "../components/check-in/check-in-list-toolbar";

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
          <Box sx={{ pt: 3 }}>
            <CheckInListResults customers={customers} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
