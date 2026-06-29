import { addBiomarker } from '@/storage/biomarker';
import { colors, globalStyles } from '@/styles/global';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddMealScreen() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [insulin_sensitivity, setInsulinSensitivity] = useState('');
  const [carb_ratio, setCarbRatio] = useState('');
  const [hbA1c, setHbA1c] = useState('');

  const handleAddBiomarker = async () => {
    if (!age || !weight) {
      Alert.alert('Error', 'Please enter a numeric age and weight.');
      return;
    }
    try {
      await addBiomarker({
        age: Number(age),
        weight: Number(weight),
        insulin_sensitivity: Number(insulin_sensitivity) || 0,
        carb_ratio: Number(carb_ratio) || 0,
        hbA1c: Number(hbA1c) || 0,
      });
      
      Alert.alert(
        'Biomarker added!',
      );
      router.push('/');
    } catch (error) {
       if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
      
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Biomarker</Text>

      <TextInput
        style={styles.input}
        placeholder='Age?'
        placeholderTextColor={colors.textSecondary}
        keyboardType='numeric'
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder='weight?'
        placeholderTextColor={colors.textSecondary}
        keyboardType='numeric'
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Insulin_sensitivity?'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={insulin_sensitivity}
          onChangeText={setInsulinSensitivity}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Carb_ratio?'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={carb_ratio}
          onChangeText={setCarbRatio}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Current hbA1c?'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={hbA1c}
          onChangeText={setHbA1c}
        />

      <TouchableOpacity style={styles.button} onPress={handleAddBiomarker}>
        <Text style={styles.buttonText}>Add Biomarker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});