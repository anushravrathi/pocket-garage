import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { addCar, cars } from "../../data/cars";

export default function AddRideScreen() {
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("Hot Wheels");
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Ride</Text>

        <TextInput
          placeholder="Brand"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={brand}
          onChangeText={setBrand}
        />
        <TextInput
          placeholder="Car Manufacturer"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={manufacturer}
          onChangeText={setManufacturer}
        />

        <TextInput
          placeholder="Car Model"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={model}
          onChangeText={setModel}
        />

        <TextInput
          placeholder="Purchase Price(₹)"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Condition</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.option, condition === "Sealed" && styles.selected]}
            onPress={() => setCondition("Sealed")}
          >
            <Text style={styles.optionText}>Sealed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, condition === "Opened" && styles.selected]}
            onPress={() => setCondition("Opened")}
          >
            <Text style={styles.optionText}>Opened</Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}

        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
        )}

        <TouchableOpacity style={styles.buttonUpload} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!model || !condition || !price) {
              setError("Please fill all required fields");
              return;
            }
            addCar({
              id: Date.now().toString(),
              brand,
              manufacturer,
              name: model,
              condition,
              price: `₹${price}`,
              value: "₹500",
              image,
            });
            console.log("Cars:", cars);
            setManufacturer("");
            setModel("");
            setCondition("");
            setPrice("");
            setError("");
            Keyboard.dismiss();
            setImage(null);
          }}
        >
          <Text style={styles.buttonText}>Add to Garage</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  input: {
    backgroundColor: "#111827",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonUpload: {
    backgroundColor: "#22c5ba",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  label: {
    color: "#9CA3AF",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  option: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#111827",
    alignItems: "center",
  },

  selected: {
    backgroundColor: "#22C55E",
  },

  optionText: {
    color: "#fff",
    fontWeight: "500",
  },
});
