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
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

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
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder={checkinstate == "items" ? "Search Mailboxes" : "Search Shipments"}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
