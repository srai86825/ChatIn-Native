import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlobalContextProvider, GlobalSocket, GlobalSocketProvider } from "./context/StateContext";
import Layout from "./Layout.jsx";

export default function App() {
  return (
    <SafeAreaView className="flex-1 flex-col  h-full w-full">
      <GlobalContextProvider>
        <GlobalSocketProvider>
          <Layout />
        </GlobalSocketProvider>
      </GlobalContextProvider>
      <StatusBar backgroundColor="#5D12a0" style="light" />
    </SafeAreaView>
  );
}
