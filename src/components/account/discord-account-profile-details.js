import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const DiscordAccountProfileDetails = ({ user }) => {
  const supabase = useSupabaseClient();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    //   password: Yup.string().max(255).required("Password is required")f,
    // }),
    onSubmit: async (values) => {
      console.log("Submitting Form");
      console.log(values);
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phone,
          address_line1: values.street1,
          address_line2: values.street2,
          address_state: values.state,
          address_city: values.city,
          address_zip: values.zip,
          address_country: values.country,
        })
        .eq("id", user.id);
      if (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={formik.handleChange}
                required
                value={formik.values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={formik.handleChange}
                type="number"
                value={formik.values.phone}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 1"
                name="street1"
                onChange={formik.handleChange}
                required
                value={formik.values.street1}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2"
                name="street2"
                onChange={formik.handleChange}
                required
                value={formik.values.street2}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={formik.handleChange}
                required
                value={formik.values.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={formik.handleChange}
                required
                value={formik.values.state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zip"
                onChange={formik.handleChange}
                required
                value={formik.values.zip}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country Code"
                name="country"
                onChange={formik.handleChange}
                required
                value={formik.values.country}
                variant="outlined"
                placeholder="US"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
