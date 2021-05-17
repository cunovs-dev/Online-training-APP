/**
 * @author Lowkey
 * @date 2021/04/25 09:59:38
 * @Description:
 */
const defaultTabBars = [{
  title: '首页',
  key: 1,
  icon: require('themes/images/ntabr/home.png'),
  selectedIcon: require('themes/images/ntabr/home-o.png'),
  route: '/',
}, {
  title: '工具',
  key: 2,
  icon: require('themes/images/ntabr/utils.png'),
  selectedIcon: require('themes/images/ntabr/utils-o.png'),
  route: '/documents',
}, {
  title: '省外',
  key: 2,
  icon: require('themes/images/ntabr/out.png'),
  selectedIcon: require('themes/images/ntabr/out-o.png'),
  route: '/out',
},
  {
    title: '发现',
    key: 2,
    icon: require('themes/images/ntabr/find.png'),
    selectedIcon: require('themes/images/ntabr/find-o.png'),
    route: '/find',
  }
  ,{
  title: '会员中心',
  key: 5,
  icon: require('themes/images/ntabr/mine.png'),
  selectedIcon: require('themes/images/ntabr/mine-o.png'),
  route: '/mine',
},
];


export default { defaultTabBars };
