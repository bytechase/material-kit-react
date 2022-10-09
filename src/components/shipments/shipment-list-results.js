import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import ShipmentTrackingCell from "./shipment-tracking-cell";
import ShipmentStatusChip from "./shipment-status-chip";

// Currency Formatter
const currencyFormatter = (format, currency, amount) => {
  const result = new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return result.format(amount);
};

export const ShipmentListResults = ({ shipments, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = shipments.map((shipment) => shipment.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === shipments.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < shipments.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>User</TableCell>
                <TableCell># of Items</TableCell>
                <TableCell>Tracking</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.slice(0, limit).map((shipment) => (
                <TableRow
                  hover
                  key={shipment.id}
                  selected={selectedCustomerIds.indexOf(shipment.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(shipment.id) !== -1}
                      onChange={(event) => handleSelectOne(event, shipment.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {shipment.user}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{shipment.item_quantity}</TableCell>
                  <TableCell>
                    <ShipmentTrackingCell
                      provider={shipment.carrier}
                      trackingNumber={shipment.tracking_number}
                    />
                  </TableCell>
                  <TableCell>
                    <ShipmentStatusChip status={shipment.status} />
                  </TableCell>
                  <TableCell>{currencyFormatter("en-US", "USD", shipment.cost / 100)}</TableCell>
                  <TableCell>{new Date(shipment.created_at).toLocaleDateString()}</TableCell>
                  {/* <TableCell>{shipment.created_at}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={shipments.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
