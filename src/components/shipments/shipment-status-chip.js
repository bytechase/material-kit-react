import React from "react";
import { Chip } from "@mui/material";

// 'UNKNOWN'
// 'PRE_TRANSIT'
// 'TRANSIT'
// 'DELIVERED'
// 'RETURNED'
// 'FAILURE'

function ShipmentStatusChip({ status }) {
  switch (status) {
    case "UNKOWN":
      return <Chip label="Unknown" />;
    case "PRE_TRANSIT":
      return <Chip label="Pre-Transit" variant="outlined" color="primary" />;
    case "TRANSIT":
      return <Chip label="Transit" color="primary" />;
    case "DELIVERED":
      return <Chip label="Delivered" color="secondary" />;
    case "RETURNED":
      return <Chip label="Returned" color="warning" />;
    case "FAILURE":
      return <Chip label="Failure" color="error" />;
  }
}

export default ShipmentStatusChip;
