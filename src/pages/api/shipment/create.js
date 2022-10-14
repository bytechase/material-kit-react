// pages/api/protected-route.js
import { supabaseClient, withApiAuth } from "@supabase/auth-helpers-nextjs";

import { supabaseServerClient } from "../../../utils/supabaseServerClient";
export default withApiAuth(async function CreateShipment(req, res) {
  // Run queries with RLS on the server
  const user = await supabaseServerClient.auth.api.getUserByCookie(req);
  const { data: newUser, error } = await supabaseServerClient.auth.api.createUser({
    email: "user@email.com",
    password: "password",
    user_metadata: { name: "Yoda" },
  });

  console.log(newUser);
  // supabaseServerClient.console.log(user);
  const { data } = await supabaseClient({ req, res }).from("shipments").select("*");
  res.json("OK");
});
