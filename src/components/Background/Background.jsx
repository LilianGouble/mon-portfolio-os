import React from 'react';
import './Background.css'; // Assurez-vous de créer un fichier CSS correspondant

const Background = ({ children }) => {
  return <div className="background">{children}</div>;
};

export default Background;
