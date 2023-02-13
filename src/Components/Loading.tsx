import { View, ActivityIndicator, StatusBar } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <ActivityIndicator color="#7F45E2" size="large" />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  );
}
