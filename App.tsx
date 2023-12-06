import { StyleSheet, View } from 'react-native';
import ButtonRead from './src/components/ButtonRead';

export default function App() {
  return (
    <View style={styles.container}>
      <ButtonRead/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
