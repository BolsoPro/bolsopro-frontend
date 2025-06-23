import React from 'react';
import TipCard from './TipCard';

const TipList = ({ tips }) => (
  <div>
    {tips.map((tip, idx) => (
      <TipCard key={idx} title={tip.title} description={tip.description} />
    ))}
  </div>
);

export default TipList;
