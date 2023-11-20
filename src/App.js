import React, { useState } from 'react';
import TaskBar from './components/TaskBar/TaskBar';
import MenuBar from './components/MenuBar/MenuBar';
import Background from './components/Background/Background';
import ContactApp from './components/ContactApp/ContactApp';
import './App.css';

function App() {
  const [isContactOpen, setContactOpen] = useState(false);

  const toggleContactApp = () => {
    console.log('toggleContactApp called'); // Ceci devrait s'afficher dans la console lorsque vous cliquez sur Contact
    setContactOpen(!isContactOpen);
  };

  return (
    <Background>
      <MenuBar />
      <TaskBar onContactClick={toggleContactApp} />
      {isContactOpen && <ContactApp onClose={toggleContactApp} />}
    </Background>
  );
}

export default App;