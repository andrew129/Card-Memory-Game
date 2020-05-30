import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from './components/pages/Game/Game';
import './App.css';

function App() {
  return (
   <div>
      <Router>
        <Route exact path='/' component={Game} />
        {/* <Route exact path='/scores' component={Generate} /> */}
      </Router>
   </div>
  );
}

export default App;
