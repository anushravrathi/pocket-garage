import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { cars, loadCars } from "../../data/cars";

export default function CollectionScreen() {
  const [garage, setGarage] = useState<any[]>([]);
  useFocusEffect(
    useCallback(() => {
      const fetchCars = async () => {
        await loadCars();
        setGarage([...cars]);
      };
      fetchCars();
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Garage</Text>

      <FlatList
        data={garage}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            )}
            <Text style={styles.name}>
              🚗 {item.manufacturer} {item.name}
            </Text>

            <Text style={styles.meta}>Brand: {item.brand}</Text>

            <Text style={styles.meta}>Purchase Price: {item.price}</Text>

            <Text style={styles.meta}>Condition: {item.condition}</Text>

            <Text style={styles.meta}>Current Value: {item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    color: "#9CA3AF",
    marginTop: 4,
  },
});
