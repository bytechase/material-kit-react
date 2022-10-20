import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [user, setUser] = useState();
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      let user = session.user;
      if (event == "SIGNED_IN") {
        const { data, error } = await supabaseClient.from("profiles").select().eq("id", user.id);
        user.first_name = data[0].first_name;
        user.last_name = data[0].last_name;
        user.role = data[0].role;
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
        supabaseClient.auth.signOut();
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
