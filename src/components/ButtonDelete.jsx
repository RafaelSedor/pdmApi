import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

function ButtonDelete({ carId, onDeleteSuccess }) {
  const deleteCar = async () => {
    try {
      const apiUrl = `https://pb.opensocialcare.debug.app.br/api/collections/Rafael_Sedor_Cars/records/${carId}`;
      await axios.delete(apiUrl);
      onDeleteSuccess();
      Alert.alert("Carro excluído com sucesso!");

    } catch (error) {
      console.error("Erro ao excluir carro:", error);
      Alert.alert("Erro ao excluir carro. Por favor, tente novamente.");
    }
  };

  return (
    <TouchableOpacity style={styles.botao} onPress={deleteCar}>
      <Text style={styles.textoBotao}>Delete seu carro!</Text>
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
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ButtonDelete;
