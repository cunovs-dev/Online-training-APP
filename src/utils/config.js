/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-24 14:59:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\utils\config.js
 */
module.exports = {
  name: 'ChinaMobil',
  userTag: {
    userName: 'userName',
    userToken: 'userPwd',
    userId: 'userId',
    photoPath: 'photoPath',
    userPhone: 'userPhone',
  },
  questionnaireURL: 'http://mobile.cunovs.com:8110/',
  // questionnaireURL: 'http://10.122.179.9:8001/',
  baseURL: 'http://mobile.cunovs.com:8111/', 
  // baseURL: 'http://10.122.123.200:8083',
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
    GetHistoryApi: '/hs',
    GetDirectionApi: '/user/direction',
    PayApi: '/business',
    GetUserInfo: '/user/self',
    GetFileType: '/datum/flags',
    GetFileList: '/datum/list',
    GetFile: '/datum',
    GetReply: '/course/discuss',
    sendReply: '/course/record/discuss',
    GetTest: '/course/reply',
    SendTest: '/course/record/reply',
    SetTime: '/course/record/visit',
    GetLntegralList: '/integral/list',
    GetRank: '/integral/mine',
    GetPraise: '/praise'
  },
};
