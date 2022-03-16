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
              cb(null, { component: require('routes/login/register') });
            }, 'register');
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
          path: 'personal',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/personal'));
              cb(null, require('routes/personal/'));
            }, 'personal');
          },
        },
        {
          path: 'collection',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/collection'));
              cb(null, require('routes/collection/'));
            }, 'collection');
          },
        },
        {
          path: 'consumption',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/consumption'));
              cb(null, require('routes/consumption/'));
            }, 'consumption');
          },
        },
        {
          path: 'reply',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/reply'));
              cb(null, require('routes/reply/'));
            }, 'reply');
          },
        },
        {
          path: 'rank',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/rank'));
              cb(null, require('routes/rank/'));
            }, 'rank');
          },
        },
        {
          path: 'history',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/history'));
              cb(null, require('routes/history/'));
            }, 'history');
          },
        },
        {
          path: 'praise',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/praise'));
              cb(null, require('routes/praise/'));
            }, 'praise');
          },
        },
        {
          path: 'perfectInformation',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/perfectInformation'));
              cb(null, require('routes/perfectInformation/'));
            }, 'perfectInformation');
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
