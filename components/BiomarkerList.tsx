import { Biomarker } from '@/storage/biomarker';
import { globalStyles } from '@/styles/global';
import { Text, View } from 'react-native';
import BiomarkerItem from './BiomarkerItem';

type BiomarkerListProps = {
  biomarkers: Biomarker[];
};

export default function BiomarkerList({ biomarkers }: BiomarkerListProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Profiles</Text>
      {biomarkers.length === 0 ? (
        <Text style={globalStyles.empty}>No biomarker logged yet.</Text>
      ) : (
        biomarkers
          .slice(0, 5)
          .map((biomarker) => (
            <BiomarkerItem
              key={biomarker.id}
              age={biomarker.age}
              weight={biomarker.weight}
              insulin_sensitivity={biomarker.insulin_sensitivity}
              carb_ratio={biomarker.carb_ratio}
              hbA1c={biomarker.hbA1c}
            />
          ))
      )}
    </View>
  );
}