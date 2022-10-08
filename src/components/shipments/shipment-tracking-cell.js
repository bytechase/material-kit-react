import React from "react";
import Image from "next/image";
import { IconButton, Typography, Box } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const LIMIT_LENGTH = 12;

function ShipmentTrackingCell({ provider, trackingNumber }) {
  function handleCopy(trackingNumber) {
    console.log("Copy Clicked");
    navigator.clipboard.writeText(trackingNumber);
  }
  // Fedex
  if (provider === "fedex") {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Image
          src={"https://apps.goshippo.com/53e60bd8bba8d749fade200cea24e253.svg"}
          width={30}
          height={30}
        />
        <Box>
          <Typography>Fedex</Typography>
          <a
            className="trackingLink"
            href={`https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`}
            target="_noblank"
          >
            {trackingNumber.length < LIMIT_LENGTH
              ? trackingNumber
              : trackingNumber.slice(0, LIMIT_LENGTH - 1) + "..."}
          </a>
        </Box>
        <IconButton aria-label="copy" onClick={() => handleCopy(trackingNumber)}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
    );
  }
  // UPS
  if (provider === "ups") {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Image
          src={"https://apps.goshippo.com/04a53a5b01fb03a84bb1b038fa9d7f7d.svg"}
          width={30}
          height={30}
        />
        <Box>
          <Typography>UPS</Typography>
          <a
            className="trackingLink"
            href={`https://www.ups.com/track?tracknum=${trackingNumber}`}
            target="_noblank"
          >
            {trackingNumber.length < LIMIT_LENGTH
              ? trackingNumber
              : trackingNumber.slice(0, LIMIT_LENGTH - 1) + "..."}
          </a>
        </Box>
        <IconButton aria-label="copy" onClick={() => handleCopy(trackingNumber)}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
    );
  }
  // USPS
  if (provider === "usps") {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Image
          src={"https://apps.goshippo.com/01e5492028087961c9d8e65ed6bb6f1f.svg"}
          width={30}
          height={30}
        />
        <Box>
          <Typography>USPS</Typography>
          <a
            className="trackingLink"
            href={`https://tools.usps.com/go/TrackConfirmAction_input?origTrackNum=${trackingNumber}`}
            target="_noblank"
          >
            {trackingNumber.length < LIMIT_LENGTH
              ? trackingNumber
              : trackingNumber.slice(0, LIMIT_LENGTH - 1) + "..."}
          </a>
        </Box>
        <IconButton aria-label="copy" onClick={() => handleCopy(trackingNumber)}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
    );
  }

  return <div>ShipmentProviderCell</div>;
}

export default ShipmentTrackingCell;
