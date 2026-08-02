import {Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteBiomarker } from '@/storage/biomarker';
import { colors } from '@/styles/global';

type BiomarkerItemProps = {
  id: string;
  age: number;
  weight: number;
  insulin_sensitivity: number;
  carb_ratio: number;
  hbA1c: number;
  onDelete:() => void;
};

export default function BiomarkerItem({
  id,
  age,
  weight,
  insulin_sensitivity,
  carb_ratio,
  hbA1c,
  onDelete,
}: BiomarkerItemProps) {
    const handleLongPress = () => {
    Alert.alert('Delete Meal', `Are you sure you want to delete the biomarker when your were weighing "${weight}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteBiomarker(id);
          onDelete();
        },
      },
    ]);
  };
  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.name}>{id}</Text>
      <Text style={styles.macros}>
        {age ?? 0}years {weight ?? 0} kg {insulin_sensitivity ?? 0}mg/dL {carb_ratio ?? 0}g/unit {hbA1c ?? 0}%
      </Text>
    </TouchableOpacity>
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