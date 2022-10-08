import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  Button,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";

function ShippingRateTable({ rates, setRate, selectedRate }) {
  // Shipping Rates Component
  return (
    <TableContainer component={Paper} sx={{ height: 300 }}>
      <Table aria-label="simple table">
        <TableBody>
          {rates.map((row) => (
            <TableRow
              key={row.label}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => setRate(row.label)}
            >
              <Button
                sx={{
                  border: selectedRate == row.label ? "1px solid black" : "1px solid lightgrey",
                  width: "100%",
                  display: "flex",
                  mt: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Image
                    src={"https://apps.goshippo.com/53e60bd8bba8d749fade200cea24e253.svg"}
                    width={60}
                    height={60}
                  />
                </Box>
                <Box sx={{ flex: 4, textAlign: "left" }}>
                  <Typography color="black" fontWeight={600}>
                    Fedex
                  </Typography>
                  <Typography color="gray">{row.label}</Typography>
                </Box>

                <Typography sx={{ flex: 1 }}>$36.07</Typography>
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ShippingRateTable;
