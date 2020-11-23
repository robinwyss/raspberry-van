import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './pages/dashboard'
import NavBar from './components/NavBar'
import { Grommet, Main } from 'grommet';
import theme from './lib/theme'


function App() {
  return (
    <Grommet theme={theme} full>
      <Main>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Main>
    </Grommet>
  );
}

export default App;
