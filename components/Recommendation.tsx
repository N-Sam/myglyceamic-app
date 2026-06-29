import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


// Define the props interface for better type safety
type RecommendationProps= {
  preds: number; // Assuming preds is a number representing HbA1c
}

export default function Recommendation({ preds }:RecommendationProps) {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      // ensuring the openai api call waits for prediction.
      if(preds > 0)
      {try {
        setLoading(true);
        setError(null);

        const OPENAI_API_KEY = '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'; // Replace with your actual OpenAI API key
        const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'; // OpenAI Chat Completions API endpoint

        const response = await fetch(OPENAI_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: "gpt-5.4-mini",
            messages: [
              { role: "system", content: "Talk like a doctor." },
              { role: "user", content: `In 50 words, advise a type 2 diabetes patient with an HbA1c of ${preds} on lifestyle adjustments to stay healthier, focusing on exercise and meal planning.` }
            ],
            max_tokens: 100, // Limit the response length
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || 'Failed to fetch recommendation from OpenAI');
        }

        const data = await response.json();
        // Assuming the response structure for chat completions
        setRecommendation(data.choices[0].message.content);

      } catch (err: any) {
        console.error(err);
        setError(`Failed to fetch recommendation: ${err.message}`);
      } finally {
        setLoading(false);
      }}
    };

    fetchRecommendation();
  }, [preds]); // Re-run effect if
  return (
    <View style={chatStyles.container}>
      <Text style={chatStyles.title}>Recommendation Based on Your Profile and Predicted HbA1c</Text>
      <View style={chatStyles.chatContainer}>
        {loading && <Text style={globalStyles.sectionTitle}>Loading recommendation...</Text>}
        {error && <Text style={[globalStyles.sectionTitle, { color: 'red' }]}>{error}</Text>}
        {recommendation && <Text style={globalStyles.sectionTitle}>{recommendation}</Text>}
      </View>
    </View>
  );
};

const chatStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatContainer: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 6,
  },
});

const globalStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
  },
});