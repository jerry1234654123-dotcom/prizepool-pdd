import http from "@/utils/request.js";

const before = '/activity/prizePool'
/// 注册
const register = (data) => {
    return http.post(before + '/user/register', data)
}
///登录
const login = (data) => {
    return http.post(before + '/user/login', data)
}
const loginFb = (data) => {
    return http.post(before + '/user/login/fb', data)
}

/// 查看奖品
const getPrizeGoods = (data) => {
    return http.get(before + '/prizeGoods', data)
}

/// 获取最新期号信息
const getNews = (data) => {
    return http.get(before + '/newestIssue', data)
}

/// 获取用户信息
const getUserInfo = () => {
    return http.get(before + '/user/info')
}

/// 获取期号信息

const getIssueInfo = (data) => {
    return http.get(before + '/getIssueInfo', data)
}

const joinPrizePool = (data) => {
    return http.post(before + '/join', data)
}

const getPointLogs = (data) => {
    return http.get(before + '/user/pointLogs', data)
}

const handleSign = () => {
    return http.post(before + '/sign')
}

const getMyIssueLogs = (data) => {
    return http.get(before + '/myIssueLogs', data)
}

const getDict = (data) => {
    return http.get('/sys/dict', data)
}

const getGameData= (data)=>{
    return http.get(before + '/data', data)
}

const getWinOrders= (data)=>{
    return http.get(before + '/winOrders', data)
}


const getCaptCha = (data)=>{
    return http.get(before + '/sys/captcha', data)
}

const setGameId = (data)=>{
    return http.post(before + '/user/setGameId',data)
}

const sendSms = (data) => http.post('/activity/sms/send',data)

const registerSms = (data) => http.post(before + '/user/register/sms',data)

const loginSms = (data) => http.post(before + '/user/login/sms',data)

export {
    register,
    getPrizeGoods,
    getNews,
    login,
    getUserInfo,
    getIssueInfo,
    joinPrizePool,
    getPointLogs,
    handleSign,
    getMyIssueLogs,
    getDict,
    getGameData,
    getWinOrders,
    getCaptCha,
    loginFb,
    setGameId,
    sendSms,
    registerSms,
    loginSms,
}