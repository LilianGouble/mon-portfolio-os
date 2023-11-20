import React, { useState, useEffect, useCallback } from 'react';
import './ContactApp.css';

const ContactApp = ({ onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Utilisez useCallback pour éviter que ces fonctions soient recréées à chaque rendu
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Effet pour ajouter et nettoyer les gestionnaires d'événements
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    // Nettoyage de l'effet
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Effet pour centrer l'application
  useEffect(() => {
    setPosition({
      x: window.innerWidth / 2 - 150, // 150 est la moitié de la largeur de votre application
      y: window.innerHeight / 2 - 200 // 200 est la moitié de la hauteur de votre application
    });
  }, []);

  return (
    <div
      className="contact-app"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="contact-app-header">
        <span>Contact</span>
        <button onClick={onClose}>X</button>
      </div>
      {/* ... contenu de l'application Contact */}
    </div>
  );
};

export default ContactApp;
