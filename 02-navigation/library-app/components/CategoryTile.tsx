import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { CategoryTileProps } from "../types";

export function CategoryTile({ title, color, onPress }: CategoryTileProps) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: '#ccc' }}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    maxWidth: '45%',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
  },
}); 