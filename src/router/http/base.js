import axios from 'axios'

const api = axios.create();
api.defaults.baseURL = 'http://118.31.8.72:83';
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

//登录
function getReg(){
    axios.post(api.defaults.baseURL+'/v1/api/user/regist', {
        userLoginname: 'qijing1',
        userPassword: 'Qj123456',
        headImage: '',
        userType: 0,
        classId: 1
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


export default  {
    getReg:getReg 
}