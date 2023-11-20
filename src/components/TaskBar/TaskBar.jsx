import React from 'react';
import './TaskBar.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct

const TaskBar = ({ onContactClick }) => {
    // ...
    return (
      <div className="taskbar">
        <div className="taskbar-item" onClick={onContactClick}>
          Contact
        </div>
        {/* ... autres éléments */}
      </div>
    );
};
  
export default TaskBar;