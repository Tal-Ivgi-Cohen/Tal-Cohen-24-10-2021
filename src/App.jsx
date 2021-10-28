import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './routes.js';
import { Header } from './cmps/Header.jsx';
import { Footer } from './cmps/Footer.jsx';
import './assets/styles/styles.scss';

export const App = () => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <main>
          <Switch>
            <Route
              exact
              path='/'
              render={() => <Redirect to='/home' />}
            ></Route>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}
