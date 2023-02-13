import { StatusBar } from "react-native";
import { Home } from "./src/screens/Home";

import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

import { Loading } from "./src/Components/Loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Home />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
