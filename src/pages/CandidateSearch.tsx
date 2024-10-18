// CandidateSearch.tsx
import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchedCandidates = await searchGithub();
      setCandidates(fetchedCandidates);
    };
    fetchCandidates();
  }, []);

  const handleSaveCandidate = () => {
    const candidateToSave = candidates[currentIndex];
    setSavedCandidates((prev) => [...prev, candidateToSave]);
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidateToSave]));
    setCurrentIndex((prev) => Math.min(prev + 1, candidates.length - 1));
  };

  const handleNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (candidates.length === 0) {
    return <h2>No candidates available to review.</h2>;
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width={100} />
        <h2>{currentCandidate.login}</h2>
        <p>Location: {currentCandidate.location || 'Not specified'}</p>
        <p>Email: {currentCandidate.email || 'Not available'}</p>
        <p>Company: {currentCandidate.company || 'Not available'}</p>
        <p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </p>
      </div>
      <button onClick={handleSaveCandidate}>+</button>
      <button onClick={handleNextCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;
