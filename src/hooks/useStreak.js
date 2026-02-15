import { useMemo } from 'react';
import { useDSA } from './useDSA';
import { isToday, getYesterdayDate } from '../utils/dateUtils';

/**
 * Custom hook for streak management
 * @returns {Object} - streak info and utilities
 */
export const useStreak = () => {
  const { currentStreak, lastActivityDate, questions } = useDSA();

  const streakInfo = useMemo(() => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];

    // Check if user solved something today
    const solvedToday = questions.some(q => {
      if (!q.completedDate) return false;
      return q.completedDate.split('T')[0] === todayDate;
    });

    // Check if last activity was yesterday
    let isActive = false;
    if (lastActivityDate) {
      const lastDate = new Date(lastActivityDate);
      const yesterdayDate = new Date(today);
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      const lastDay = lastDate.toISOString().split('T')[0];
      const yesterday = yesterdayDate.toISOString().split('T')[0];

      isActive = lastDay === yesterday || lastDay === todayDate;
    }

    return {
      count: currentStreak,
      isActive,
      solvedToday,
      message: isActive
        ? solvedToday
          ? 'Keep it up! 🔥'
          : 'Solve a problem to continue your streak!'
        : 'Start a new streak!',
    };
  }, [currentStreak, lastActivityDate, questions]);

  return streakInfo;
};

export default useStreak;
