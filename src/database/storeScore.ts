import { getDoc, updateDoc, setDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ScoreData {
  address: string;
  score: number;
  // Add other fields here if needed
}

export const addScoreToFirebase = async (address: string,newScore: number) => {
  try {

    // const address = await AsyncStorage.getItem('device_address');
    // if (!address) {
    //   throw new Error('Device address not found');
    // }

    // address here is ethereum address, not the device address

    const scoreDocRef = doc(FIRESTORE_DB, 'users', address?.toString());

    // Get the current score
    const scoreDoc = await getDoc(scoreDocRef);
    let currentScore = 0;

    if (scoreDoc.exists()) {
      const scoreData = scoreDoc.data() as ScoreData;
      currentScore = scoreData.score;
    }

    // Update the score with the new value
    const updatedScore = currentScore + newScore;
    await setDoc(scoreDocRef, { score: updatedScore });
    console.log('Score updated to Firestore with address:', address, 'New total score:', updatedScore);
  } catch (error) {
  }
};
