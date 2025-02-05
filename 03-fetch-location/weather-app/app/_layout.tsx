import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ADD8E6",
          },
          headerTitleStyle: {
            color: "black",
          },
          headerTitle: "Weather Forecast 🌤️",
        }}
      />
    </>
  );
}
