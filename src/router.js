import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import Login from 'routes/login/LoginLayout';
import App from 'routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('models/dashboard'));
          cb(null, { component: require('routes/dashboard/') });
        }, 'dashboard');
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/dashboard'));
              cb(null, require('routes/dashboard/'));
            }, 'dashboard');
          },
        },
        {
          path: 'details',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/details'));
              cb(null, require('routes/details/'));
            }, 'details');
          },
        },
        {
          path: 'login',
          component: Login,
          getIndexRoute (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/login'));
              cb(null, { component: require('routes/login/login') });
            }, 'login');
          },
          childRoutes: [
            {
              path: '/login/login',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('models/login'));
                  cb(null, require('routes/login/login'));
                }, 'login');
              },
            },
            {
              path: '/login/register',
              getComponent (nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('models/login'));
                  cb(null, require('routes/login/register'));
                }, 'register');
              },
            },
          ],
        },
        {
          path: 'mine',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/mine'));
              cb(null, require('routes/mine/'));
            }, 'mine');
          },
        },
        {
          path: 'videoList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/videoList'));
              cb(null, require('routes/videoList/'));
            }, 'videoList');
          },
        },
        {
          path: 'documents',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/documents'));
              cb(null, require('routes/documents/'));
            }, 'documents');
          },
        },
        {
          path: 'out',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/out'));
              cb(null, require('routes/out/'));
            }, 'out');
          },
        },
        {
          path: 'find',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/find'));
              cb(null, require('routes/find/'));
            }, 'find');
          },
        },
        {
          path: 'application',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/application'));
              cb(null, require('routes/application/'));
            }, 'application');
          },
        },
        {
          path: 'homeworkdetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/homeworkdetails/'));
            }, 'homeworkdetails');
          },
        },
        {
          path: 'iframe',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/iframe/'));
            }, 'iframe');
          },
        },
        {
          path: 'lessondetails',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/lessondetails'));
              cb(null, require('routes/lessondetails/'));
            }, 'lessondetails');
          },
        },
        {
          path: 'setup',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/setup'));
              cb(null, require('routes/setup/'));
            }, 'setup');
          },
        },
        {
          path: 'aboutus',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/aboutus'));
              cb(null, require('routes/aboutus/'));
            }, 'aboutus');
          },
        },
        {
          path: 'building',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/building'));
              cb(null, require('routes/building/'));
            }, 'building');
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            const { location: { pathname } } = nextState;
            if (pathname && /^\/(android).+?index\.html$/.exec(pathname)) {
              require.ensure([], (require) => {
                registerModel(app, require('models/dashboard'));
                cb(null, require('routes/dashboard/'));
              });
            }
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
