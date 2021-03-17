import './App.css';
import React from 'react';
import Navbar from './components/Navbar/CustomNavbar';
import Footer from './components/Footer/CustomFooter';
import Landing from './views/Landing';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Landing />
      <Footer />
    </div>
  );
};

export default App;