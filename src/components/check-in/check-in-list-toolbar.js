import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
} from "@mui/material";

import { shipments } from "../../__mocks__/shipments";

export const CheckInListToolbar = ({ checkinstate, handlebuttongroup }) => (
  <Box>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Check In
      </Typography>
      <Box sx={{ m: 1 }}>
        <ToggleButtonGroup
          value={checkinstate}
          exclusive
          onChange={handlebuttongroup}
          aria-label="text alignment"
        >
          <ToggleButton value="items" aria-label="left aligned">
            Items
          </ToggleButton>
          <ToggleButton value="shipments" aria-label="centered">
            Shipments
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ width: 500 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={shipments}
                getOptionLabel={(option) => option.userEmail}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Mailbox" />}
              />
            </Box>
            <Box sx={{ justifyContent: "flex-end", display: "flex", gap: 2, width: "100%" }}>
              <Button variant="contained">Save</Button>
              <Button variant="contained">Print Labels</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
