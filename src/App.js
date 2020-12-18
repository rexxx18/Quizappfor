import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Play from './components/Quiz/Play';
import QuizInstructions from './components/Quiz/QuizInstructions'
import Quizsummary from './components/Quiz/Quizsummary';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/play/instructions' exact component={QuizInstructions} />
      <Route path='/play/quiz' exact component={Play} />
      <Route path='/play/quizsummary' exact component={Quizsummary}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
