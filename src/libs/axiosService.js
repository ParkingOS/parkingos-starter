import Vue from 'vue';
import { Message, MessageBox } from 'element-ui'
import axios from "axios";
import router from "../router";
import store from '../store';
import $ from 'jquery'


function changeUrlArg(url, arg, val){
    let pattern = arg+'=([^&]*)';
    let replaceText = arg+'='+val;
    return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
}

//根据环境引入不同的请求路径
axios.defaults.baseURL = process.env.BASE_API;
let PUBLIC_URL = {
    BASE_API:process.env.BASE_API,
    SERVER_API:process.env.SERVER_API,
    BOLINK_API:process.env.BOLINK_API,
};
let Authority = process.env.NODE_ENV == 'production'?require('./const_yun.js'):require('./const_test.js');
Vue.prototype.$PUBLIC_URL = PUBLIC_URL;
Vue.prototype.$Authority = Authority;

//所有请求头都加上token   然后验证
axios.interceptors.request.use(
    config => {
        //云平台login 过滤
        if ((config.url.indexOf("/user/dologin")) > -1) {
            return config;
        }
        //泊链路径过滤
        if ((config.url.indexOf("s.bolink.club")) > -1 || (config.url.indexOf("beta.bolink.club")) > -1) {
            let users = JSON.parse(sessionStorage.getItem("user"))
            $.ajax({
                type: 'post',
                url: `${PUBLIC_URL.BOLINK_API}/parkingos/gettoken`,
                data:users.token_params,
                async: false,
                success: function (res) {
                    let data = JSON.parse(res);
                    if(data.state === 1){
                        if(config.method == 'post'){
                            if(config.data != undefined){
                                config.data.set('token',data.token)
                            }else{
                                config.url = changeUrlArg(config.url,'token',data.token)
                            }

                        }else if(config.method == 'get'){
                            config.url = changeUrlArg(config.url,'token',data.token)
                        }else{

                        }
                        sessionStorage.setItem('token',data.token);
                    }

                    return config;
                }
            })
            return config;
        }
        //泊链路径过滤
        if ((config.url.indexOf("bt1.bolink.club")) > -1 || (config.url.indexOf("bt2.bolink.club")) > -1) {
            return config;

        }

        let token = sessionStorage.getItem('cloud_token')
        if (token) {
            config.headers['token'] = token
        }

        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)
// response interceptor
axios.interceptors.response.use(
    response => {
        const ret = response.data;
        if (ret.validate != 'undefined' && ret.validate == '0') {
            //登录超时.重新登录
            if (store.state.app.gateState) {
                store.state.app.gateState = false;
                setTimeout(() => {
                    MessageBox.alert('登录超时,请重新登录!', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            sessionStorage.removeItem('user');
                            sessionStorage.removeItem('token');
                            sessionStorage.removeItem('cloud_token');
                            localStorage.removeItem('comid');
                            localStorage.removeItem('groupid');
                            router.push({
                                path: '/loginCloud'
                            })
                        }
                    })
                }, 150);
            }
            return false;
        } else if (ret.validate != 'undefined' && ret.validate == '1') {
            //过期.重新登录
            if (store.state.app.gateState) {
                store.state.app.gateState = false;
                setTimeout(() => {
                    MessageBox.alert('当前账号在另一地点登录，您被迫下线了。如果这不是您本人的操作，那么您的密码可能已经泄露，建议您修改密码。', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            sessionStorage.clear();
                            router.push({
                                path: '/loginCloud'
                            })
                        }
                    })
                }, 150);
            }
            return false;
        }
        else if (ret.is_kicked && ret.is_kicked == '1') {
            //过期.重新登录
            if (store.state.app.gateState) {
                store.state.app.gateState = false;
                setTimeout(() => {
                    MessageBox.alert('当前账号在另一地点登录，您被迫下线了。如果这不是您本人的操作，那么您的密码可能已经泄露，建议您修改密码。', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            sessionStorage.clear();
                            router.push({
                                path: '/loginCloud'
                            })
                        }
                    })
                }, 150);
            }
            return false;
        }
        else if (ret.result != 'undefined' && ret.result == 'fail') {
            //登录超时.重新登录
            if (store.state.app.gateState) {
                store.state.app.gateState = false;
                setTimeout(() => {
                    MessageBox.alert('登录超时,请重新登录!', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {
                            sessionStorage.removeItem('user');
                            sessionStorage.removeItem('token');
                            sessionStorage.removeItem('cloud_token');
                            localStorage.removeItem('comid');
                            localStorage.removeItem('groupid');
                            router.push({
                                path: '/loginCloud'
                            })
                        }
                    })
                }, 150);
            }
            return false;
        }
        else if (ret.validate != 'undefined' && ret.validate == '2') {
            //令牌无效.重新登录

            return false;
        } else {
            return response;
        }

        return response;
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
Vue.prototype.$axios = axios;
