import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { TrainingSession } from '../types';

function SessionDetails() {
  const { sessionId } = useParams();
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/sessions/${sessionId}`
        );
        const data = await response.json();
        setSession(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center py-8">Loading session details...</div>;
  }

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Session not found.</p>
        <Link to="/home" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <Link
        to="/home"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold mb-2">Training Session</h1>
        <p className="text-gray-600">
          {new Date(session.startTime).toLocaleDateString()} at{' '}
          {new Date(session.startTime).toLocaleTimeString()}
        </p>
        <p className="text-lg font-semibold text-blue-600 mt-2">
          {session.trainerName}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Score</p>
          <p className="text-3xl font-bold text-blue-600">{session.score}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Total Balls</p>
          <p className="text-3xl font-bold">{session.numberOfBalls}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Goals</p>
          <p className="text-3xl font-bold">{session.numberOfGoals}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Best Streak</p>
          <p className="text-3xl font-bold">{session.bestStreak}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Avg Speed of Play</p>
          <p className="text-3xl font-bold">{session.avgSpeedOfPlay}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Exercises</p>
          <p className="text-3xl font-bold">{session.numberOfExercises}</p>
        </div>
      </div>
    </div>
  );
}

export default SessionDetails;