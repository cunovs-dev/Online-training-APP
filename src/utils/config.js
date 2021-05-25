module.exports = {
  name: 'ChinaMobil',
  userTag: {
    username: 'username',
    usertoken: '',
    userid: 'userid',
    useravatar: 'useravatar',
    usertype: 'usertype',
  },
  baseURL: 'http://192.168.0.204:8083',
  api: {
    LoginApi: '/login/account',
    PhoneCodeApi: '/login/code',
    ValidInformationApi: '/config/valid',
    SetInformationApi: '/user/direction',
    GetPosterApi: '/config/banner',
    GetRequiredCoursesApi: '/config/self',
    GetRecommendApi: '/config/guess',
    SearchCourseApi: '/course/search',
    RetrievalApi: '/course',
  },
};
