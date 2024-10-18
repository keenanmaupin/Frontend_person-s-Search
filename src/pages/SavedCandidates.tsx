// SavedCandidates.tsx
import { useEffect, useState } from 'react';
import { Candidate } from '../api/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  if (savedCandidates.length === 0) {
    return <h2>No candidates have been accepted.</h2>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <ul>
        {savedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <img src={candidate.avatar_url} alt={candidate.login} width={50} />
            <h2>{candidate.login}</h2>
            <p>Location: {candidate.location || 'Not specified'}</p>
            <p>Email: {candidate.email || 'Not available'}</p>
            <p>Company: {candidate.company || 'Not available'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
