/**
 * @author Lowkey
 * @date 2021/04/25 09:59:38
 * @Description:
 */
import { config } from 'utils';
import { _cg } from './cookie';

const { questionnaireURL, userTag: { userToken } } = config;
const questionnairePath = `${_cg('voteUri') ? _cg('voteUri') : questionnaireURL}?token=${_cg(userToken)}`;

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
},
{
  title: '发现',
  key: 2,
  icon: require('themes/images/ntabr/find.png'),
  selectedIcon: require('themes/images/ntabr/find-o.png'),
  route: '/find',
},
{
  title: '会员中心',
  key: 5,
  icon: require('themes/images/ntabr/mine.png'),
  selectedIcon: require('themes/images/ntabr/mine-o.png'),
  route: '/mine',
},
];

const defaultBusiness = [
  { title: '首页' },
  { title: '移动' },
  { title: '政企' },
  { title: '家庭' },
  { title: '新兴' },
  { title: '信息化' },
  { title: 'OAO' },
  { title: '渠道' },
  { title: '直销' },
  { title: '门店' },
  { title: '党建' },
  { title: '团队' },
];

const defaultScene = [
  { title: '集团' },
  { title: '乡村' },
  { title: '聚类' },
  { title: '枢纽' },
  { title: '主题' },
  { title: '园区' },
  { title: '社区' },
  { title: '集市' },
  { title: '商业街' },
  { title: '楼宇' },
  { title: '校园' },
  { title: '新兴' },
];

const defaultSceneIcon = {
  7: require('../themes/images/grid/01.png'),
  8: require('../themes/images/grid/02.png'),
  9: require('../themes/images/grid/03.png'),
  10: require('../themes/images/grid/04.png'),
  11: require('../themes/images/grid/05.png'),
  2: require('../themes/images/grid/06.png'),
  1: require('../themes/images/grid/07.png'),
  4: require('../themes/images/grid/08.png'),
  3: require('../themes/images/grid/09.png'),
  6: require('../themes/images/grid/11.png'),
  5: require('../themes/images/grid/10.png'),
  12: require('../themes/images/grid/12.png'),
};


const defaultShortBoard = [
  { title: '督导激发力' },
  { title: '维系协调力' },
  { title: '展示影响力' },
  { title: '统筹策划力' },
];

const mineGrid = [
  {
    icon: require('../themes/images/others/history.png'),
    text: '个人信息',
    path: 'personal',
  },
  {
    icon: require('../themes/images/others/course.png'),
    text: '我的收藏',
    path: 'collection',
  },
  {
    icon: require('../themes/images/others/note.png'),
    text: '能力测试',
    path: questionnairePath,
  }, {
    icon: require('../themes/images/others/credit.png'),
    text: '已赞课程',
    path: 'praise',
  },
];


export default {
  questionnairePath,
  defaultTabBars,
  defaultBusiness,
  defaultSceneIcon,
  defaultScene,
  defaultShortBoard,
  mineGrid,
};
