import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/CustomNavbar';
import Footer from './components/Footer/CustomFooter';
import Landing from './views/Landing';
import Projects from './views/Projects';
import Contact from './views/ContactMe';
import Test2 from './components/test2';

import img from './Assets/img/Pad.png';
import boat from './Assets/img/Boat.png';

function App() {
  return (
    <div className="App">
      <Test2 img={img}/>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="*">
            <div className="contentWrap">
              <img src={boat} className='Boat' alt="Boat"></img>
              <Landing />
            </div>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;