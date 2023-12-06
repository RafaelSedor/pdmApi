import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { faker } from '@faker-js/faker';
import axios from 'axios';

function ButtomCreate({ onCreateSuccess }) {
  const createCar = async () => {
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
      if (createdCar) {
        Alert.alert(
          "Carro inserido com sucesso!",
          `ID: ${createdCar.id}\nCor: ${createdCar.Cor}\nMarca: ${createdCar.marca}\nWHP: ${createdCar.whp}`
        );
        if (onCreateSuccess) {
          onCreateSuccess();
        }
      }
    } catch (error) {
      console.error("Erro ao obter carro:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.botao} onPress={createCar}>
      <Text style={styles.textoBotao}>Crie seu carro!</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    marginTop: 200,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ButtomCreate;
