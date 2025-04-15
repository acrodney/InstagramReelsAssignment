import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Timeline from "./App/screens/Timeline";

export default function App() {
  return (
    <PaperProvider>
      <Timeline />
    </PaperProvider>
  );
}
