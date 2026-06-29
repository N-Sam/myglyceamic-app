import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import { Biomarker, getBiomarkers } from '@/storage/biomarker';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function HomeScreen() {
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
      <Text style={globalStyles.title}>MyGlycaemic</Text>
      <HomeHeader />
      <MacroGrid biomarkers={biomarkers}/>
    </ScrollView>
  );
}