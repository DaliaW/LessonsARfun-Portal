import React from 'react';
import './App.css';
import MindARComponent from './MindARComponent';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BasicExample from './BasicExample'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route
              exact
              path="/lesson/:id"
              render={(props) => <MindARComponent {...props} />}
            />
            <Route
              exact
              path="/"
              render={(props) => <BasicExample {...props} />}
            />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
