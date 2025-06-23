import React from 'react';

const TipCard = ({ title, description }) => (
  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
    <h3 className="font-semibold text-blue-700 mb-1">{title}</h3>
    <p className="text-blue-900 text-sm">{description}</p>
  </div>
);

export default TipCard;
