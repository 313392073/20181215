import axios from 'axios';
import store from '../../store/store';
import router from '../index';
import * as types from '../../store/types';
import qs from 'qs';
const baseURL = 'http://118.31.8.72:83';
const timeout = 5000;

//请求的拦截
axios.interceptors.request.use(
    config => {
        if(store.token){
            config.headers.Authorization=`token${store.state.token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应的拦击
axios.interceptors.response.use(
    config => {
        //loading
        return config
    },
    error => {
        if(error.response){
            switch(error.response.status){
                case 401:
                store.commit(types.LOGOUT)
                router.replace({
                    path:'/login',
                    query:{redirect:router.currentRoute.fullPath}
                })
            }
        }
        return Promise.resolve(error.response.data)
    }
)

function checkStatus(response){
    //如果http状态码正常 则直接返回数据
    if(response && (response.status === 200) || (response.status === 304) || (response.status === 400)){
        return response
    }
    //异常状态  把错误信息返回去
    return {
        status: -404,
        msg:'网络异常'
    }
}

function checkCode(res){
    //如果code 异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if(res.status === -404){
        console.log(res.msg)
    }
    if(res && (!res.data.success)){
        console.log(res.error_msg)
    }
    return res.data
}


function postUrl(url,data){
    return axios({
        method:'post',
        baseURL:baseURL,
        url,
        data:qs.stringify(data),
        timeout:timeout,
        headers:{
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then((res) => {
        return checkStatus(res)
    }).then((res) => {
        return checkCode(res)
    }).catch((error) => {
        return Promise.reject(error)
    })
}


function getUrl(url,params){
    return axios({
        method:'get',
        baseURL:baseURL,
        url,
        params,
        timeout:timeout,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then((res) => {
        return checkStatus(res)
    }).then((res) => {
        return checkCode(res)
    })
}
export default  {
    getUrl,
    postUrl 
}