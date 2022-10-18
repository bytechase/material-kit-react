import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

export const AccountProfile = ({ user }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {user.app_metadata.provider == "discord" ? (
          <>
            <Avatar
              src={user.user_metadata.avatar_url}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user.user_metadata.name}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.user_metadata.email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.timezone}
            </Typography>
          </>
        ) : (
          <>
            <Avatar
              src={user.user_metadata.avatar_url}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user.name}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.user_metadata.email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.timezone}
            </Typography>
          </>
        )}
      </Box>
    </CardContent>
    <Divider />
    {/* <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
);
