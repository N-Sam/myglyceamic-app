import { clearAllBiomarkers, Biomarker, getBiomarkers } from '@/storage/biomarker';
import { colors, globalStyles } from '@/styles/global';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { 
  Alert,
  StyleSheet,
  ScrollView, 
  View, 
  TouchableOpacity,
  Text } from 'react-native';
import BiomarkerItem from '../../components/BiomarkerItem';

export default function BiomarkersScreen() {
   const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  
    const loadBiomarkers = async () => {
      const data = await getBiomarkers();
      setBiomarkers(data);
      //console.log('Loaded biomarkers:', data);
    };

    const handleClearAll = async () => {
    await clearAllBiomarkers();
    loadBiomarkers();
    };

  
    useFocusEffect(
      useCallback(() => {
        loadBiomarkers();
      }, []),
    );
  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Biomarkers</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Biomarkers</Text>
      {biomarkers.length === 0 ? (
        <Text style={globalStyles.empty}>No biomarker logged yet.</Text>
      ) : (
        biomarkers
          .map((biomarker) => (
            <BiomarkerItem
              key={biomarker.id}
              id={biomarker.id}
              age={biomarker.age}
              weight={biomarker.weight}
              insulin_sensitivity={biomarker.insulin_sensitivity}
              carb_ratio={biomarker.carb_ratio}
              hbA1c={biomarker.hbA1c}
              onDelete={loadBiomarkers}
            />
          ))
      )}
    </View>
          {biomarkers.length > 0 && (
        <TouchableOpacity
          style={{ alignItems: 'center', marginBottom: 40 }}
          onPress={handleClearAll}
        >
          <Text style={styles.clearButton}>Clear All Biomarkers</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    paddingBottom: 40,
  },
  clearButton: {
    color: colors.alert,
    fontSize: 16,
    fontWeight: '600',
  },
});