import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { InventoryListToolbar } from "../components/inventory/inventory-list-toolbar";
import { InventoryListResults } from "../components/inventory/inventory-list-results";

const Page = () => (
  <>
    <Head>
      <title>Inventory | COP</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <InventoryListToolbar />
        <Box sx={{ mt: 3 }}>
          <InventoryListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
