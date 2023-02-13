import { View, Text, FlatList } from "react-native";
import { Equals } from "phosphor-react-native";
import { Button } from "../Components/Button";

export function Home() {
  const buttonValues = [
    ["CE", "C", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["+-", 0, ",", "="],
  ];

  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <View className="flex-row">
        <Text className="flex-1 font-regular text-xl text-right text-gray-500">
          1 + 1
        </Text>
      </View>

      <View className="mt-2 flex-row items-center justify-center">
        <Equals size={26} color="#6B6B6B" />
        <Text className="flex-1 font-regular text-4xl text-right text-gray-100">
          0
        </Text>
      </View>

      <View className="w-screen mt-7 px-6">
        <FlatList
          data={buttonValues.flat()}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Button title={item.toString()} />}
          numColumns={4}
        />
      </View>
    </View>
  );
}
