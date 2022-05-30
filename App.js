import React, { useEffect } from "react";
import App from "./src";
import * as Analytics from "expo-firebase-analytics";

export default function Main() {
  useEffect(() => {
    Analytics.logEvent("first_open").then(() => {});
  }, []);
  return <App />;
}
