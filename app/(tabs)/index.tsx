import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket Garage</Text>
      <Text style={styles.subtitle}>Track. Value. Flex.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Garage Value</Text>
        <Text style={styles.value}>₹0</Text>
      </View>
      <Text style={{ color: "#3B82F6", marginTop: 20 }}>+ Add Ride</Text>
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
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 16,
  },
  cardTitle: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  value: {
    color: "#22C55E",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
});
