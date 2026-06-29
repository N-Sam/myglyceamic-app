import AsyncStorage from '@react-native-async-storage/async-storage';

export type Biomarker = {
  id: string;
  age: number;
  weight: number;
  insulin_sensitivity: number;
  carb_ratio: number;
  hbA1c: number;
};

const BIOMARKER_KEY = 'biomarker';

export const getBiomarkers = async (): Promise<Biomarker[]> => {
  const data = await AsyncStorage.getItem(BIOMARKER_KEY);
  return data ? JSON.parse(data) : [];
};

export const addBiomarker = async (
  biomarker: Omit<Biomarker, 'id'>,
): Promise<Biomarker> => {
  const biomarkers = await getBiomarkers();
  const newBiomarker: Biomarker = {
    ...biomarker,
    id: Date.now().toString(),
  };
  await AsyncStorage.setItem(BIOMARKER_KEY, JSON.stringify([newBiomarker, ...biomarkers]));
  return newBiomarker;
};