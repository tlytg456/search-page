import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Timer from './routes/Timer';
// import Products from './routes/Products';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/timer" exact component={Timer} />
        {/*<Route path="/products" exact component={Products} />*/}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
