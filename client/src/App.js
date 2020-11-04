import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UsersProvider } from '@contexts/UsersContext';
import Header from '@components/header';
import IssuePage from '@pages/IssuePage';
import NewIssuePage from '@pages/NewIssuePage';
import UserPage from '@pages/UserPage';
import MilestonePage from '@pages/MilestonePage';
import { LabelProvider } from '@contexts/LabelContext';
import { MilestonesProvider } from '@contexts/MilestonesContext';
import TestPage from '@pages/TestPage';

const App = () => {
  return (
    <LabelProvider>
      <MilestonesProvider>
        <UsersProvider>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (localStorage.getItem('auth_token')) return <IssuePage />;
                return <UserPage />;
              }}
            />
            <Route path="/newIssue" component={NewIssuePage} />
            <Route path="/milestone" component={MilestonePage} />
            <Route path="/test" component={TestPage} />
            <Route
              render={({ location }) => (
                <div>
                  <h2>이 페이지는 존재하지 않습니다</h2>
                  <p>{location.pathname}</p>
                </div>
              )}
            />
          </Switch>
        </UsersProvider>
      </MilestonesProvider>
    </LabelProvider>
  );
};
export default App;
