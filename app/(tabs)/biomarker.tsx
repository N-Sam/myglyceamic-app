import { Biomarker, getBiomarkers } from '@/storage/biomarker';
import { globalStyles } from '@/styles/global';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import BiomarkerList from '../../components/BiomarkerList';
export default function BiomarkersScreen() {
   const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  
    const loadBiomarkers = async () => {
      const data = await getBiomarkers();
      setBiomarkers(data);
      console.log('Loaded biomarkers:', data);
    };
  
    useFocusEffect(
      useCallback(() => {
        loadBiomarkers();
      }, []),
    );
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>All Biomarker</Text>
      <Link href='/add_biomarker' style={{ fontSize: 18, color: '#007bff' }}>
        Add New Biomarker
      </Link>
      <BiomarkerList biomarkers={biomarkers}/>
    </ScrollView>
  );
}