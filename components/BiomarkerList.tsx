import { Biomarker } from '@/storage/biomarker';
import {ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import BiomarkerItem from './BiomarkerItem';

type BiomarkerListProps = {
  biomarkers: Biomarker[];
  onDelete: () => void;
};

export default function BiomarkerList({ biomarkers, onDelete }: BiomarkerListProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.sectionTitle}>Recent Biomarkers</Text>
      {biomarkers.length === 0 ? (
        <Text style={styles.empty}>No biomarker logged yet.</Text>
      ) : (
        biomarkers
        .slice(0, 5)
          .map((biomarker) => (
            <BiomarkerItem
              key={biomarker.id}
              id={biomarker.id}
              age={biomarker.age}
              weight={biomarker.weight}
              insulin_sensitivity={biomarker.insulin_sensitivity}
              carb_ratio={biomarker.carb_ratio}
              hbA1c={biomarker.hbA1c}
              onDelete={onDelete}
            />
          ))
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  empty: {
    color: '#a0a0b0',
    fontSize: 14,
  },
});