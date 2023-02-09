import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import db from "../utils/db";

const PhotosList = () => {
  const [photos, setPhotos] = useState();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from images;`, 1, (_, { rows: { _array } }) =>
        setPhotos(_array)
      );
    });
  }, [photos]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Image
            source={{ uri: itemData.item.imageSrc }}
            style={{ height: 200, width: 100 }}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

export default PhotosList;
