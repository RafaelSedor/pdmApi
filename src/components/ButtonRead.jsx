import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, FlatList, View, Alert } from "react-native";
import axios from "axios";
import ButtonDelete from "./ButtonDelete";
import ButtonUpdate from "./ButtonUpdate";
import ButtomCreate from "./ButtonCreate";
import { faker } from '@faker-js/faker';

function ButtonRead({ invertColors }) { 
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
      <ButtomCreate onCreateSuccess={viewCars} invertColors={invertColors} />
      <TouchableOpacity style={[styles.botao, { backgroundColor:'#3498db'}]} onPress={viewCars}>
        <Text style={[styles.textoBotao, { color: '#fff'}]}>Veja os carros!</Text>
      </TouchableOpacity>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.text, { color: invertColors ? '#fff' : '#000', }]}>ID: {item.id}</Text>
            <Text style={[styles.text, { color: invertColors ? '#fff' : '#000', }]}>Cor: {item.cor}</Text>
            <Text style={[styles.text, { color: invertColors ? '#fff' : '#000', }]}>Marca: {item.marca}</Text>
            <Text style={[styles.text, { color: invertColors ? '#fff' : '#000', }]}>WHP: {item.whp}</Text>
            <ButtonDelete carId={item.id} onDeleteSuccess={viewCars} invertColors={invertColors} />
            <ButtonUpdate carId={item.id} onUpdateSuccess={viewCars} invertColors={invertColors} />
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
  },
  text:{
    fontWeight: '600',
  }
});

export default ButtonRead;
