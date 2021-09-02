const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { BugApp } from './pages/BugApp.jsx';
import { BugDetails } from './pages/BugDetails.jsx';
import { BugEdit } from './pages/BugEdit.jsx';
export function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path='/bug/edit/:bugId' component={BugEdit} />
          <Route path='/bug/:bugId' component={BugDetails} />
          <Route path='/bug' component={BugApp} />
        </Switch>
      </main>
    </Router>
  );
}
