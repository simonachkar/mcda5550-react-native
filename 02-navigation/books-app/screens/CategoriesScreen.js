import { FlatList } from "react-native";
import CategoryTile from "../components/CategoryTile";

import { CATEGORIES } from "../data";

function CategoriesScreen({ navigation }) {
  const pressHandler = (itemData) => {
    navigation.navigate("BooksList", { categoryId: itemData.item.id });
  };

  const renderCategoryItem = (itemData) => {
    return (
      <CategoryTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={() => pressHandler(itemData)}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
