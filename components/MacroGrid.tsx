
import Recommendation from '@/components/Recommendation';
import { Biomarker } from '@/storage/biomarker';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MacroCard from './MacroCard';

type MacroGridProps = {
  biomarkers: Biomarker[];
};

export default function MacroGrid({ biomarkers }: MacroGridProps) {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const data = biomarkers[0];

  useEffect(() => {
    if (data) {
      fetchPrediction();
    }
  }, [data]);

  const fetchPrediction = async () => {
  setLoading(true);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
  const API_URL = process.env.EXPO_PUBLIC_API_URL

  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age: Number(data.age),
        weight: Number(data.weight),
        insulin_sensitivity: Number(data.insulin_sensitivity),
        carb_ratio: Number(data.carb_ratio),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const result = await response.json();
    if (result.hbA1c === undefined) {
      throw new Error('Unexpected response shape: ' + JSON.stringify(result));
    }
    setPrediction(result.hbA1c.toFixed(2));
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    const message = error instanceof Error ? error.message : String(error);
    if (error instanceof DOMException && error.name === 'AbortError') {
      alert('Request timed out. The server may be waking up — please try again in a moment.');
      } else {
        alert(`Error fetching HbA1c prediction: ${message}`);
        }
  } finally {
    setLoading(false);
  }
  };

  if (!data) return null;

  return (
    <View style={styles.grid}>
      <MacroCard label='Age' value={`${data.age?? 0} years`} goal='25' color='#6bcb77' />
      <MacroCard label='Weight' value={`${data.weight?? 0} kg`} goal='60' color='#ff6b6b' />
      <MacroCard label='Insulin_sensitivity' value={`${data.insulin_sensitivity?? 0} mg/dL`} goal='12' color='#4ecdc4' />
      <MacroCard label='Carb_ratio' value={`${data.carb_ratio?? 0} g/uint`} goal='10' color='#ffd93d' />
      <MacroCard label='Current HbA1c' value={`${data.hbA1c?? 0} %`} goal='5.5' color='#f50c2f' />
      
      <MacroCard 
        label='Predicted HbA1c' 
        value={loading ? 'Calculating...' : `${prediction?? '--'} %`} 
        goal='6.2' 
        color='#b41986' 
      />
      <View style={styles.isolatedComponent}>
        <Recommendation  preds={prediction?? 0}/>
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  isolatedComponent: {
    position: 'absolute', // Breaks out of the grid layout flow
    top: 400,              // Positions 400px from the top of the parent container
    left: 20,             // Positions 20px from the left of the parent container
    right: 100,            // Stretches across to 20px from the right
    backgroundColor: 'rgba(6, 2, 34, 0.9)',
    padding: 15,
    borderRadius: 8,
    zIndex: 1,            // Ensures it renders on top of the grid items
  },
});