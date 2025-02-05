import { FlatList, View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { CategoryTile } from "../components/CategoryTile";
import { CATEGORIES } from "../data/categories";
import { Category } from "../types";

export default function Index() {
  const router = useRouter();

  const pressHandler = (category: Category) => {
    router.push({
      pathname: '/books-list',
      params: { categoryId: category.id }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryTile
            title={item.title}
            color={item.color}
            onPress={() => pressHandler(item)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  }
});
