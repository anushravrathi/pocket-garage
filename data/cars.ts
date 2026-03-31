import AsyncStorage from "@react-native-async-storage/async-storage";

export let cars: any[] = [];

// Load cars from storage
export const loadCars = async () => {
  try {
    const data = await AsyncStorage.getItem("cars");
    if (data) {
      cars = JSON.parse(data);
    }
  } catch (error) {
    console.log("Error loading cars", error);
  }
};

// Save cars to storage
export const saveCars = async () => {
  try {
    await AsyncStorage.setItem("cars", JSON.stringify(cars));
  } catch (error) {
    console.log("Error saving cars", error);
  }
};

// Add new car
export const addCar = async (car: any) => {
  cars.push(car);
  await saveCars();
};
