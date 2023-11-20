import React from 'react';
import './MenuBar.css'; // Assurez-vous de créer un fichier CSS correspondant

const MenuBar = () => {
  // Fonction pour obtenir l'heure actuelle
  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = React.useState(new Date().toLocaleDateString());
  // Mettre à jour l'heure toutes les secondes
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="menubar">
      <div className="menubar-item">{currentDate}</div>
      <div className="menubar-item">{currentTime}</div>
      {/* Ajoutez d'autres éléments de menu comme la batterie, le WiFi, etc. */}
      <div className="menubar-item">Batterie</div>
      <div className="menubar-item">WiFi</div>
    </div>
  );
};

export default MenuBar;
