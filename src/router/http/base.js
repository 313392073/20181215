import axios from 'axios';
import store from '../../store/store';
import router from '../index';
import * as types from '../../store/types';
import qs from 'qs';
import API from './api'
import vue from '../../main.js';
const baseURL = 'http://118.31.8.72:98';
// const baseURL = 'http://192.168.1.56';
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
        console.log(error)
        if(error.response){
            switch(error.response.status){
                case 401:
                store.commit(types.LOGOUT)
                router.replace({
                    path:'/',
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
        if(response.data.success == 0 && response.data.code == 401) {
            showError(response.data.msg)
        }
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
    return res.data
}

function showError(msg) {
    vue.$layer.open({
        type:0,
        title:'温馨提示',
        content: msg,
        shade:true,
        time:2,
        anim:'scale',
        yes() {
            vue.$layer.closeAll()
            vue.$router.push('/');
        }
    });
}

function showMsg(msg) {
    vue.$layer.open({
        type:0,
        title:'温馨提示',
        content: msg,
        shade:true,
        time:2,
        anim:'scale',
        yes() {
            vue.$layer.closeAll()
        }
    });
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
        if(res.data.success == 0 && res.data.code == 401) {
            showError(res.data.msg);
            return
        }
        return checkStatus(res)
    }).then((res) => {
        if(res.data.success == 0 && res.data.code == 401) {
            showError(res.data.msg)
            return
        }
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
        if(res.data.success == 0 && res.data.code == 401) {
            showError(res.data.msg);
            return;
        }
        return checkStatus(res)
    }).then((res) => {
        if(res.data.success == 0 && res.data.code == 401) {
            showError(res.data.msg);
            return;
        }
        return checkCode(res)
    })
}

function getBatch () {
    let num = 0
    if(store.state.token == '') {
        showError("登录超时，请重新登录")
    }
    let params = {
        token:store.state.token
    }
    getUrl(API.allUrl.batch,params).then((res) => {
        if(res.code == 200 && res.success ==  1) {
            store.commit(types.BATCH,res.obj)
            localStorage.setItem("batch", res.obj);
        }else{
            num++;
            if(num < 4) {
                setTimeout(() => {
                    getBatch()
                },1000)
            }
        }
    })
}
//初始化菜单
function h5plushGoInitMenu() {
    if(window.plus) {
        plusReady();
    }else{
        document.addEventListener('plusready',plusReady,false);
    }
}

function plusReady() {
    let loginFlag = store.state.userType;
    let rolelastmenu = plus.storage.getItem("rolemenu_"+loginFlag)
    if(loginFlag == '') {
        vue.$router.push('/')
    }else if(loginFlag == 0){
        //学生的路由
        if(rolelastmenu) {
            vue.$router.push('/stu'+rolelastmenu)
        }else{
            vue.$router.push('/stu')
        }
    }else if(loginFlag == 1) {
        if(rolelastmenu) {
            vue.$router.push('/tea'+rolelastmenu)
        }else{
            vue.$router.push('/tea')
        }
    }else{
        vue.$router.push('/')
    }
}

function getMenuStep() {
    let arr = []
    let params = {
        token:store.state.token,
        batch:store.state.batch
    }
    return postUrl(API.allUrl.curstep,params).then((res) => {
        console.log(res)
        if(res.success == 1 && res.code == 200) {
            arr = res.obj
        }else{
            showMsg(res.msg)
        }
        return arr
    })
}

Array.prototype.in_array = function(e)
{
	for(i=0;i<this.length && this[i]!=e;i++);
	return !(i==this.length);
}

//判断一个元素在不在数组内
function arrContain(arr,element) {
    for(var i=0;i<arr.length;i++) {
        if(arr[i] == element) {
            return true
        }else{
            return false;
        }
    }
}

export default  {
    baseURL,
    getUrl,
    postUrl,
    getBatch,
    showError,
    showMsg,
    getMenuStep, 
    arrContain
}