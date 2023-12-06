import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList, View, Alert } from "react-native";
import axios from "axios";
import ButtonDelete from "./ButtonDelete";
import ButtonUpdate from "./ButtonUpdate";
import ButtomCreate from "./ButtonCreate";
import { faker } from '@faker-js/faker';

function ButtonRead() {
  const [cars, setCars] = useState([]);

  const viewCars = async () => {
    const apiUrl = 'https://pb.opensocialcare.debug.app.br/api/collections/Rafael_Sedor_Cars/records';

    try {
      const response = await axios.get(apiUrl);

      const viewCars = response.data.items;
      const carsData = viewCars.map(obj => ({
        id: obj.id,
        cor: obj.Cor,
        marca: obj.marca,
        whp: obj.whp
      }));
      
      setCars(carsData);
    } catch (error) {
      console.error("Erro ao obter carros:", error);
    }
  };

  const createAndRefreshCars = async () => {
    const apiUrl = 'https://pb.opensocialcare.debug.app.br/api/collections/Rafael_Sedor_Cars/records';

    const data = {
      "Cor": faker.vehicle.color(),
      "whp": faker.number.int(1000),
      "marca": faker.vehicle.manufacturer(),
    };

    try {
      const response = await axios.post(apiUrl, data);

      const createdCar = response.data;
      console.log(createdCar);
      if(createdCar){
        Alert.alert(
          "Carro inserido com sucesso!",
          `ID: ${createdCar.id}\nCor: ${createdCar.Cor}\nMarca: ${createdCar.marca}\nWHP: ${createdCar.whp}`
        );
        viewCars();
      }
    } catch (error) {
      console.error("Erro ao obter carro:", error);
    }
  };

  return (
    <View>
      <ButtomCreate onCreateSuccess={viewCars} />
      <TouchableOpacity style={styles.botao} onPress={viewCars}>
        <Text style={styles.textoBotao}>Veja os carros!</Text>
      </TouchableOpacity>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Cor: {item.cor}</Text>
            <Text>Marca: {item.marca}</Text>
            <Text>WHP: {item.whp}</Text>
            <ButtonDelete carId={item.id} onDeleteSuccess={viewCars} />
            <ButtonUpdate carId={item.id} onUpdateSuccess={viewCars}/>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  }
});

export default ButtonRead;
