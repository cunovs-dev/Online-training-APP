module.exports = {
  name: 'ChinaMobil',
  userTag: {
    userName: 'userName',
    userToken: 'userPwd',
    userId: 'userId',
    photoPath: 'photoPath',
    userPhone: 'userPhone',
  },
  questionnaireURL: 'http://moodle.cunovs.com:8088/',
  // baseURL: 'http://192.168.0.204:8083',
  baseURL: 'http://mobile.cunovs.com:8111',
  api: {
    LoginApi: '/login/account',
    LogoutApi: '/login/logout',
    PhoneCodeApi: '/login/code',
    GetBaseInfo: '/config/appVersion',
    ValidInformationApi: '/config/valid',
    SetInformationApi: '/user/direction',
    GetPosterApi: '/config/banner',
    GetRequiredCoursesApi: '/config/self',
    GetRecommendApi: '/config/guess',
    SearchCourseApi: '/course/search',
    RetrievalApi: '/course',
    SearchApi: '/course/search',
    GetCourseApi: '/course',
    CollectionApi: '/collect',
    PraiseApi: '/praise',
    GetHistoryApi: '/user/video',
    GetDirectionApi: '/user/direction',
    PayApi: '/business',
    GetUserInfo: '/user/self',
    GetFileType: '/datum/flags',
    GetFileList: '/datum/list',
    GetFile: '/datum',
  },
};