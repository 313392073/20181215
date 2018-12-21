import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
Vue.use(Vuex);

const kuser = 'user';
const kauth = 'auth';

const store = new Vuex.Store({
    state:{
        user:null,
        token:null,
        title:''
    },
    mutations:{
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
        }
    }
})
export default store