import React, { Component } from 'react';
import './App.css';
import AllRoutes from './pages/AllRoutes';
import '../src/assets/css/style.scss'


class App extends Component {
  render() {
    return (
      <div className="App">
        <AllRoutes />
      </div>
    );
  }
}

export default App;
