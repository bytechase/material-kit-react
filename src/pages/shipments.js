import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ShipmentListResults } from "../components/shipments/shipment-list-results";
import { ShipmentListToolbar } from "../components/shipments/shipment-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { shipments } from "../__mocks__/shipments";

import { supabase } from "../utils/supabaseClient";

const Page = () => {
  const [shipments, setShipments] = useState();
  useEffect(() => {
    console.log("Fetching Shipments");
    fetchShipments();
    // addShipment();
  }, []);

  const fetchShipments = async () => {
    const { data, error } = await supabase.from("shipments").select();
    if (error) console.log(`Error;\n${error}`);
    console.log(data);
    setShipments(data);
  };
  const addShipment = async () => {
    const { data, error } = await supabase.from("users").insert([{ email: "bob@gmail.com" }]);
    if (error) console.log(`Error;\n${JSON.stringify(error, null, 2)}`);
    console.log(data);
  };
  if (!shipments) {
    return <div>Loading...</div>;
  }
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
