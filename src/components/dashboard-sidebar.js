import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
// Icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PostAddIcon from "@mui/icons-material/PostAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import GroupIcon from "@mui/icons-material/Group";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// Hooks
import { useAuth } from "../contexts/supabase_user_context";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const userItems = [
  {
    href: "/dashboard/account",
    icon: <ManageAccountsIcon fontSize="small" />,
    title: "Account",
  },
];
const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/shipments",
    icon: <LocalShippingIcon fontSize="small" />,
    title: "Shipments",
  },
  {
    href: "/checkin",
    icon: <PostAddIcon fontSize="small" />,
    title: "Check In",
  },
  {
    href: "/inventory",
    icon: <InventoryIcon fontSize="small" />,
    title: "Inventory",
  },
  {
    href: "/checkout",
    icon: <PlaylistRemoveIcon fontSize="small" />,
    title: "Check Out",
  },
  {
    href: "/users",
    icon: <GroupIcon fontSize="small" />,
    title: "Users",
  },
  {
    href: "/livestreams",
    icon: <LiveTvIcon fontSize="small" />,
    title: "Live Streams",
  },
  {
    href: "/dashboard/account",
    icon: <ManageAccountsIcon fontSize="small" />,
    title: "Account",
  },
  {
    href: "/",
    icon: <LogoutIcon fontSize="small" />,
    title: "Logout",
  },
  {
    href: "/register",
    icon: <UserAddIcon fontSize="small" />,
    title: "Register",
  },
  {
    href: "/404",
    icon: <XCircleIcon fontSize="small" />,
    title: "Error",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const [userBalance, setUserBalance] = useState();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = useSupabaseClient();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  // Fetching User's Balance
  useEffect(() => {
    if (user) {
      getBalance(user);
    }
  }, [user]);

  // getBalance Function
  async function getBalance(user) {
    const { data, error } = await supabase.from("profiles").select().eq("id", user.id);
    if (data.length == 1) {
      setUserBalance(data[0].balance);
    } else {
      setUserBalance("undefined");
    }
  }

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <Logo
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              {/* Discord User */}
              {user && user.app_metadata.provider == "discord" ? (
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    {user.user_metadata.name}
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {`Balance: ${userBalance}`}
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Acme Inc
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    Tier : Premium
                  </Typography>
                </div>
              )}
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        {/* Admin Items */}
        {user && user.role == 1 ? (
          <Box sx={{ flexGrow: 1 }}>
            {items.map((item) => (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ))}
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            {/* User Items */}
            {userItems.map((item) => (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ))}
          </Box>
        )}

        {/* <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/static/images/sidebar_pro.png" />
          </Box>
          <NextLink href="https://material-kit-pro-react.devias.io/" passHref>
            <Button
              color="secondary"
              component="a"
              endIcon={<OpenInNewIcon />}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink> */}
        {/* </Box> */}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
