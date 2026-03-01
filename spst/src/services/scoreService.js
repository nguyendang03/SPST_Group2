import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const SCORES_COLLECTION = 'scores';

export const saveScore = async (userId, userName, score, correctAnswers, totalQuestions, timeSpent) => {
  try {
    const docRef = await addDoc(collection(db, SCORES_COLLECTION), {
      userId,
      userName,
      score,
      correctAnswers,
      totalQuestions,
      timeSpent,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving score:', error);
    return { success: false, error: error.message };
  }
};

export const getUserScores = async (userId) => {
  try {
    const q = query(
      collection(db, SCORES_COLLECTION),
      where('userId', '==', userId),
      orderBy('score', 'desc'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, scores };
  } catch (error) {
    console.error('Error getting user scores:', error);
    return { success: false, error: error.message };
  }
};

export const getLeaderboard = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, SCORES_COLLECTION),
      orderBy('score', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, leaderboard };
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return { success: false, error: error.message };
  }
};
