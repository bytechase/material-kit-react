import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ShipmentListResults } from "../components/shipments/shipment-list-results";
import { ShipmentListToolbar } from "../components/shipments/shipment-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { shipments } from "../__mocks__/shipments";

const Page = () => {
  return (
    <>
      <Head>
        <title>Shipments | COP</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ShipmentListToolbar />
          <Box sx={{ mt: 3 }}>
            <ShipmentListResults shipments={shipments} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
