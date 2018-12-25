function getUserAccount(){
    return axios.get('/user/123');
}

function getUserPermissions(){
    return axios.get('/user/122/permission');
}

axios.all([getUserAccount(),getUserPermissions()]).then(axios.spread((acct,perms) => {
    console.log(acct,perms)
}))

//添加请求拦截器
let interceptor = axios.interceptor.request.use(function(){/**
 * 请求拦截器
 */})
//移除请求拦截器
axios.interceptors.request.eject(myInterceptor);
/**
 * 
 * 0在线测试，
 * 1制作棱锥，
 * 2侧面积公式，
 * 3表面积测试，
 * 4体积公式，
 * 5线线关系，
 * 6课后实验
 */