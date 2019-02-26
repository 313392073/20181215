import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import { stat } from 'fs';
Vue.use(Vuex);

const kuser = 'user';
const kauth = 'auth';
const store = new Vuex.Store({
    state:{
        user:null,
        token:null,
        batch:'',
        title:'',
        userType:'', //0 学生  1老师
        chooseCourse:''
    },
    mutations:{
        [types.USERTYTPE]:(state,data) => {
            state.userType = data;
        },
        [types.CHOOSECOURSE]:(state,data) => {
            state.chooseCourse = data;
        },
        [types.LOGIN]:(state,data) => {
            localStorage.setItem(kuser,data.userInfo)
            localStorage.setItem(kauth,data.token)
            state.token = data.token;
            state.user = data.userInfo;
        },
        [types.LOGOUT]:(state) => {
            localStorage.removeItem(kuser);
            localStorage.removeItem(kauth);
            state.token =  null;
            state.user =  {};
        },
        [types.TITLE]:(state,data) => {
            state.title = data;
        },
        [types.BATCH]:(state,data) => {
            state.batch = data
        }
    }
})
export default store