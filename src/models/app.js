
import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { config, cookie, setLoginOut } from 'utils';
import { defaultTabBarIcon, defaultTabBars } from 'utils/defaults';


const { userTag: { username, usertoken, userid, useravatar, usertype } } = config,
  { _cs, _cr, _cg } = cookie,
  getInfoUser = () => {
    const result = {};
    result[username] = _cg(username);
    result[usertoken] = _cg(usertoken);
    result[userid] = _cg(userid);
    result[useravatar] = _cg(useravatar);
    result[usertype] = _cg(usertype);
    return result;
  },
  getUserLoginStatus = (users = '') => {
    users = users || getInfoUser();
    return users[userid] !== '' && users[usertoken] !== '' && users[username] !== '';
  },
  appendIcon = (tar, i) => {
    let { icon = '', selectedIcon = '', route = '/default' } = tar;
    tar.key = ++i;
    if (icon == '' || selectedIcon == '') {
      route = route.substr(1);
      tar = { ...tar, ...(defaultTabBarIcon[route || 'default'] || {}) };
    }
    return tar;
  };

export default {
  namespace: 'app',
  state: {
    spinning: false,
    isLogin: getUserLoginStatus(),
    users: getInfoUser(),
    tabBars: [],
    updates: {},
    showModal: false,
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      const others = {};
      others[usertoken] = _cg(usertoken);
      dispatch({
        type: 'query',
        payload: {
          currentVersion: cnVersion,
          systemType: cnDeviceType(),
          ...others,
        },
      });
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/') {
          dispatch({
            type: 'updateUsers',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      let tabBars = defaultTabBars;

      tabBars = tabBars.map((bar, i) => appendIcon(bar, i));
      yield put({
        type: 'updateState',
        payload: {
          tabBars,
        },
      });
    },
    * logout ({}, { call, put, select }) {
      const data = yield call(logout);
      if (data) {
        setLoginOut();
        yield put({
          type: 'updateState',
          payload: {
            users: {},
            isLogin: false,
          },
        });
        yield put(routerRedux.replace({
          pathname: '/login',
        }));
      }
    },


  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateUsers (state, { payload = {} }) {
      let { users: appendUsers = getInfoUser(), others = {} } = payload,
        { users } = state;
      users = { ...users, ...appendUsers };
      let isLogin = getUserLoginStatus(users);
      return {
        ...state,
        ...others,
        users,
        isLogin,
      };
    },

  }
  ,
};
