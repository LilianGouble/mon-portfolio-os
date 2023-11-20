import React, { useState, useEffect, useCallback } from 'react';
import './ContactApp.css';

const ContactApp = ({ onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 300, height: 400 });
  const [isResizing, setIsResizing] = useState(false);
  const [startSize, setStartSize] = useState({ width: 300, height: 400 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const minWidth = 100; // Minimum width
  const minHeight = 100; // Minimum height

  const handleDragMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDragMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleDragMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMouseMove);
      document.addEventListener('mouseup', handleDragMouseUp);
    } else {
      document.removeEventListener('mousemove', handleDragMouseMove);
      document.removeEventListener('mouseup', handleDragMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMouseMove);
      document.removeEventListener('mouseup', handleDragMouseUp);
    };
  }, [isDragging, handleDragMouseMove, handleDragMouseUp]);

  const handleResizeMouseDown = useCallback((e) => {
    setIsResizing(true);
    setStartSize(size);
    setStartPos({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  }, [size]);

  const handleResizeMouseMove = useCallback((e) => {
    if (!isResizing) return;
    let newWidth = startSize.width + (e.clientX - startPos.x);
    let newHeight = startSize.height + (e.clientY - startPos.y);

    setSize({
      width: Math.max(newWidth, minWidth),
      height: Math.max(newHeight, minHeight),
    });
  }, [isResizing, startPos, startSize, minWidth, minHeight]);

  const handleResizeMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMouseMove);
      document.addEventListener('mouseup', handleResizeMouseUp);
    } else {
      document.removeEventListener('mousemove', handleResizeMouseMove);
      document.removeEventListener('mouseup', handleResizeMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMouseMove);
      document.removeEventListener('mouseup', handleResizeMouseUp);
    };
  }, [isResizing, handleResizeMouseMove, handleResizeMouseUp]);

  useEffect(() => {
    setPosition({
      x: window.innerWidth / 2 - 150,
      y: window.innerHeight / 2 - 200
    });
  }, []);

  return (
    <div
      className="contact-app"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <div className="contact-app-header" onMouseDown={handleDragMouseDown}>
        {/* Cette zone peut maintenant être utilisée pour déplacer la fenêtre */}
        <span>Contact</span>
        <button onClick={onClose}>X</button>
      </div>
      {/* ... contenu de l'application Contact */}
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}>
        {/* Élément utilisé pour redimensionner la fenêtre */}
      </div>
    </div>
  );
};

export default ContactApp;