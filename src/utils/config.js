module.exports = {
  name: 'ChinaMobil',
  userTag: {
    username: 'username',
    usertoken: 'KSESSIONID',
    userpower: 'userpower',
    userid: 'userid',
    useravatar: 'useravatar',
    usertype: 'usertype',
  },
  baseURL: 'http://192.168.0.204:8083',
  api: {
    GetVocationalApi: '/config/yw',
    GetSceneApi: '/config/cj',
    GetPosterApi: '/config/banner',
    GetRequiredCoursesApi: '/config/self',
    GetRecommendApi: '/config/guess',
    SearchCourseApi: '/course/search',
    RetrievalApi: '/course',
  },
};
