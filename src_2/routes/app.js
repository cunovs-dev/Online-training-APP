import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { classnames, config, getLocalIcon } from 'utils';
import { Loader, TabBar, Icon, Modal } from 'components';
import './app.less';

let isFirst = true;
const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location;
  const { tabBars, users, updates: { upgraded = false, urls = '' }, showModal } = app;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  pathname = pathname.endsWith('/index.html') ? '/' : pathname; // Android配置首页自启动
  const href = window.location.href,
    menusArray = [];
  tabBars.map((_) => {
    menusArray.push(_.route);
  });
  cnSetStatusBarStyle(pathname);
  const update = (url, upgraded) => {
    if (upgraded) {
      return (<Modal
        visible
        transparent
        maskClosable={false}
        title="当前版本过低"
        footer={[{ text: '立刻升级', onPress: () => cnUpdate(url) }]}
      >
        <div>
          为保证正常使用，请先升级应用
        </div>
      </Modal>);
    }
    if (isFirst) {
      Modal.alert('版本更新', '点击升级我的阿拉善', [
        {
          text: '暂不升级',
          onPress: () => dispatch({
            type: 'app/updateState',
            payload: {
              showModal: false,
            },
          }),
          style: 'default',
        },
        { text: '立刻升级', onPress: () => cnUpdate(url) },
      ]);
      isFirst = false;
    }
  };
  if (pathname !== '/' && menusArray.length && !menusArray.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects[`${pathname.startsWith('/') ? pathname.substr(1) : pathname}/query`]} />
      {children}
    </div>);
  }

  return (
    <div className="tabbarbox">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={false}
      >
        {tabBars.map((_, index) => {
          const props = Object.assign({
            key: index,
            selectedIcon: _.icon,
            selected: pathname === _.route,
            onPress: () => {
              const { appends = {}, route } = _;
              dispatch(routerRedux.push({
                  pathname: route,
                  query: {
                    ...appends,
                  },
                },
              ));
            },
          }, _);
          props.icon = (<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${props.icon}) center center /  0.42rem 0.42rem no-repeat`,
          }}
          />);

          props.selectedIcon = (<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${props.selectedIcon}) center center /  0.42rem 0.42rem no-repeat`,
          }}
          />);
          return (
            <TabBar.Item {...props}>
              {pathname === _.route ? children : ''}
            </TabBar.Item>
          );
        })}
      </TabBar>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
  icon: PropTypes.string,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
