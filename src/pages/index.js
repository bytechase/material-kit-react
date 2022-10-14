import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { IncomingShipments } from "../components/dashboard/incoming-shipments";
import { LatestTransactions } from "../components/dashboard/latest-transactions";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { IncomingItems } from "../components/dashboard/incoming-items";
import { TotalProfit } from "../components/dashboard/total-profit";
import { HighestStockItems } from "../components/dashboard/highest-stock-items";
import { DashboardLayout } from "../components/dashboard-layout";
import { AvgTurnAround } from "../components/dashboard/avg-turn-around";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
const Page = () => (
  <>
    <Head>
      <title>Dashboard | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <IncomingShipments />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <IncomingItems />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <AvgTurnAround />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <HighestStockItems sx={{ height: "100%" }} />
          </Grid>
          {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid> */}
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestTransactions />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
