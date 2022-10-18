import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "cash-app",
    label: "Cash App",
  },
  {
    value: "paypal",
    label: "Paypal",
  },
];

export const AccountPayoutDetails = ({ user }) => {
  const [values, setValues] = useState({
    payoutMethod: "Cash App",
    username: "USA",
  });
  console.log(user);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Payout Details" />
        <Divider />
        <CardContent>
          <Stack spacing={3}>
            {/* Payment Provider */}
            <TextField
              fullWidth
              label="Payment Provider"
              name="payoutMethod"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.payoutMethod}
              variant="outlined"
            >
              {states.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            {/* Payment Username */}
            <TextField
              fullWidth
              label="Username"
              name="username"
              onChange={handleChange}
              required
              value={values.firstName}
              variant="outlined"
            />
          </Stack>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save Payment
          </Button>
        </Box>
      </Card>
    </form>
  );
};
