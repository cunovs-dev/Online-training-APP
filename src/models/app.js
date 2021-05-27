import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { config, cookie, setLoginOut } from 'utils';
import { logout } from 'services/app';
import { defaultTabBarIcon, defaultTabBars } from 'utils/defaults';


const { userTag: { userName, userToken, userId, photoPath } } = config,
  { _cg } = cookie,
  getInfoUser = () => {
    const result = {};
    result[userName] = _cg(userName);
    result[userId] = _cg(userId);
    result[photoPath] = _cg(photoPath);
    result[userToken] = _cg(userToken);
    return result;
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
    vocationalList: [],
    sceneList: [],
    weaknessList: [],
    selfChoice: {},
    users: getInfoUser(),
    tabBars: [],
    updates: {},
    showModal: false,
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      const others = {};
      others[userToken] = _cg(userToken);
      dispatch({
        type: 'query',
        payload: {
          currentVersion: cnVersion,
          systemType: cnDeviceType(),
          ...others,
        },
      });
      history.listen(({ pathname }) => {
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
    * logout ({}, { call, put }) {
      const data = yield call(logout);
      if (data) {
        setLoginOut();
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
      return {
        ...state,
        ...others,
        users,
      };
    },
  },
};
