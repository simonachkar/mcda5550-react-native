import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#282120",
        headerStyle: { backgroundColor: "#FAD02C" },
        headerTitleStyle: { color: "#282120" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "📚 Books App"
        }}
      />
      <Stack.Screen
        name="books-list"
        options={{
          title: "Category"
        }}
      />
    </Stack>
  );
}
