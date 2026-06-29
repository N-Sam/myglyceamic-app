import { StyleSheet, Text, View } from 'react-native';

type MealItemProps = {
  age: number;
  weight: number;
  insulin_sensitivity: number;
  carb_ratio: number;
  hbA1c: number;
};

export default function MealItem({
  age,
  weight,
  insulin_sensitivity,
  carb_ratio,
  hbA1c,
}: MealItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{age}</Text>
      <Text style={styles.macros}>
        {weight} kg {insulin_sensitivity}mg/dL {carb_ratio}g/unit {hbA1c}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  macros: {
    fontSize: 13,
    color: '#a0a0b0',
    marginTop: 4,
  },
});