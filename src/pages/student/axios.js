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

/**
 * 执行get 请求
 * eg: 为给定ID的user 创建请求
 */
axios.get('/user?Id=1235').then((res) => {
    console.log(res)
}).catch((error) => {
    console.log(error)
}) 
axios.get('/user',{
    params:{
        ID:123456
    }
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})

/**
 * 执行post请求
 */
axios.post('/user',{
    firstName:'Fred',
    lastName:'Fsss'
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})

/**
 * 执行多个并发请求
 */
function getUserAccount(){
    return axios.get('/user/12345');
}

function getUserPermissions(){
    return axios.get('/user/12345/permissions')
}

axios.all([getUserAccount(),getUserPermissions()]).then(axios.spread((acc,perm) => {
    //请求两个都执行完成
}))

/**
 * 可以向axios 传递相关配置来创建请求
 */
axios({
    method:'post',
    url:'/user/12345',
    data:{
        firstName:'Fred',
        lastName:'Fsss'
    }
})

/**
 *  创建实例
 * 可以使用自定义配置创建一个axios实例
 * axios.create([config])
 * 
 */
axios.create([config]);
var  instance = axios.create({
    baseURL:'https://some-domain.com/api/',
    timeout:1000,
    headers:{'X-Custom-Header': 'foobar'}
})

/**
 * 请求配置项
 */

var obj =  {
    url:'', //用于请求的服务器的URL
    method:'get', //创建请求时使用的方法
    baseURL:'baseUrl 将自动加在url前面  除非url 是一个绝对的url 它可以通过设置一个baseUrl 便于为axios 实例的方法传递传递相对url',
    /**
     * transformRequest 允许在向服务器发送前  修改请求数据 
     * 只能用在put post patch 这几个请求方法
     * 后面数组中的函数必须返回一个字符串 或ArrayBuffer  或Stream
     */
    transformRequest:[function(data) {
        //对data进行任意转换处理
        return data; 
    }],
    /**
     * transformResponse 在传递给then/catch 前 允许修改响应数据
     */
    transformResponse:[function(data){
        //对data 进行任意转换处理
        return data;
    }],
    //headers  是即将被发送的自定义请求头
    headers:{'X-Requested-With': 'XMLHttpRequest'},
    //params 是即将与请求一起发送的URL参数  必须是一个无格式对象（plain object ） 或者URLSearchParams对象
    params:{
        ID:123456
    },
    //paramsSeriallizer 是一个负责params序列化的函数
    paramsSeriallizer:function(params){
        return Qs.stringify(params,{arrayFormat:'brackets'})
    },
    /**
     * data 是作为请求主体被发送的数据
     * 只适用于这些请求方法 put post patch
     * 在没有设置transformRequest时 必须是一下类型之一
     * string, plain object,ArrayBuffer, ArrayBufferView, URLSearchParams
     * 浏览器专属：FormData  file blob 
     * Node 专属： Stream
     */
    data:{
        firstName:'Fred'
    },
    //timeout 指定请求超时的毫秒数（0表示五超时时间） 如果请求花费了朝贡timeout的时间  请求将被中断
    timeout:1000,
    //withCredentials 表示跨域请求时是否需要使用凭证
    withCredentials:false, //默认的
    /**
     * adapter 允许自定义处理请求  以使测试更轻松
     * 返回一个promise 并应用一个有效的响应
     */
    adapter:function(config){

    },
    /**
     * auth 表示应该使用HTTP 基础验证 并提供凭据
     * 这将设置一个'Authorization'头 覆写掉现有的任意使用headers 设置的自定义'Authorization'头
     */
    auth:{
        usernmame:'janedoe',
        password:'ssss'
    },
    // responseType 表示服务器响应的数据类型 
    responseType:'json',//默认的
     // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
    xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
     // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
    httpAgent:new http.httpAgent({keepAlive:true}),
    httpsAgent:new http.httpsAgent({keepAlive:true}),
    /**
     * proxy 定义代理服务器的主机名称和端口
     * auth 表示http 基础验证应当用于连接代理  并提供凭据
     * 这将会设置一个Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
     */
    proxy:{
        host:'',
        port:'',
        auth:{
            username:'',
            password:'rapunz3l'
        }
    },
    //cancelToken 指定用于取消请求的cancel token
    cancelToken:new CancelToken(function(cancel){

    })
 }

 /**
  * 配置的默认值/defaults
  * 可以指定将被用在各个请求的配置默认值
  */
 //全局的axios 默认值

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


//自定义实例默认值 创建实例时设置配置的默认值
var instance = axios.create({
    baseURL:''
})
/**
 * 配置的优先顺序
 * 配置会以一个有限顺序进行合并  这个顺序是  在lib/defaults.js 找到的库的默认值  然后是实例的
 * defaults属性  最后是请求的config参数  后者将优先于前者
 */
//使用由库提供的默认值来创建实例
// 此时超时配置的默认值是0
 var instance = axios.create()
//覆写库超时默认值  现在在超时前 所有的请求都会等待2.5秒
 instance.defaults.timeout = 2500
 //为已知需要花费很长时间的请求覆写超时设置
 instance.get('/longRequest',{
     timeout:5000
 })

 //拦截器 在请求或响应被then 或catch 处理前拦截他们
 //添加请求拦截器
 axios.interceptor.request.use(function(config) {
    //在发送请求之前做些什么 
    return config;
 },function(error) {
     //对请求错误做些什么
     return Promise.reject(error)
 })

 //添加响应拦截器
 axios.interceptor.response.use(function(res){
     //对响应数据做点什么
     return res;
 },function(error) {
     //对相应错误做点什么
     return Promise.reject(error)
 })

 //移除拦截器
 var myInterceptor = axios.interceptor.request.use(function(){

 })
 //移除拦截器
 axios.interceptor.reject.eject(myInterceptor)

 //错误处理

axios.get('/user/12345').catch((err) => {
    if(err.response) {
        //请求已经发出去  但是服务器响应的状态码不在2xx范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }else{
        
        console.log(err.message)
    }
})

/**
 * 可以使用validateStatus 配置选项定义一个自定义http 状态码的错误范围
 */
axios.get('/user/12345',{
    validateStatus:function(status) {
        return status < 500
    }
})

//取消  cancel token取消请求  
 var CancelToken = axios.CancelToken;
 var cancel;

 axios.get('/user/123456',{
     cancelToken: new CancelToken(function executor(c) {
        // executor  函数接受一个cancel 函数作为参数 
        cancel = c;
     })
 })
cancel();


/**
 * computed 
 * 1  用来监控自己定义的变量  该变量不在data 里面声明 直接定义在computed里面定义 
 * 可以在页面上进行双向数据绑定  展示出结果或用做其他处理
 * 
 * 2  cpmouted 比较适合对个变量或者对象进行处理后返回一个结果值  也就是数多个变量中的某一个值发生了变化
 * 则我们监控的这个值就会发生变化  
 * eg: 购物车里面的商品列表和总金额之间的关系  只要商品列表里面的商品数量发生变化  或减少或增加或删除商品 总金额都应该发生变化  这里的这个总金额使用computed 属性来进行计算是最好的选择
 *
 *  与watch 的区别
 * watch 主要是用于监控vue 实例的变化  他监控的变量当然必须在data里面声明才可以   可以监控一个变量  也可以是一个对象
 * watch 一般用于监控路由  input 输入框的值特殊处理  适合的场景是  一个数据影响多个数据
 */

var answer = {
    "success": "1",
    "code": "200",
    "msg": "获取成功",
    "obj": [
      {
        "course_id": 3,
        "if_handle": 0,
        "course_type": 0,
        "answer": "{\"a\":[\"A\",\"B\"]}",
        "handled_answer": "{\"a\":[\"A\",\"B\"]}",
        "user_loginname": "漆静01",
        "item_score": 1,
        "state": 0,
        "course_item_id": 25,
        "course_item": "{\"q\":[\"正棱锥必须具备的两个条件为（）；\",\"（）。\"],\"c\":[\"底面是多边形\",\"底面是正多边形\",\"其余各面是全等的等腰三角形\",\"有一个面是等腰三角形的棱锥\"],\"num\":\"1(2)\"}"
      },
      {
        "course_pic_path": "http://118.31.8.72:88/math/course_item/t1.png",
        "course_id": 3,
        "if_handle": 0,
        "course_type": 0,
        "answer": "{\"a\":[\"A\",\"B\",\"D\",\"C\",\"E\"]}",
        "handled_answer": "{\"a\":[\"A\",\"B\",\"D\",\"C\",\"E\"]}",
        "user_loginname": "漆静01",
        "item_score": 1,
        "state": 0,
        "course_item_id": 24,
        "course_item": "{\"q\":[\"我们把一个面是多边形，其余各面都是三角形，并且这些三角形有一个公共顶点的多面体叫做（）。\",\"这个多边形叫做（），\",\"有公共顶点的三角形面叫做（），\",\"各侧面的公共点叫做（），\",\"相邻两侧面的公共边叫做（）。\"],\"c\":[\"棱锥的底面\",\"棱锥的顶点\",\"棱锥\",\"棱锥的侧面\",\"棱锥的侧棱\"],\"num\":\"1(1)\"}"
      },
      {
        "course_id": 3,
        "if_handle": -1,
        "course_type": 0,
        "answer": "{\"a\":[\"A\",\"C\"]}",
        "state": 0,
        "course_item_id": 37,
        "course_item": "{\"q\":[\"正棱柱的侧棱长都（），\",\"侧面都是（）。\"],\"c\":[\"都相等\",\"不一定相等\",\"全等的等腰三角形\",\"全等的矩形\"],\"num\":\"2\"}"
      },
      {
        "course_id": 3,
        "if_handle": -1,
        "course_type": 1,
        "answer": "{\"a\":[\"\"],\"bmj\":[\"40\"],\"tj\":[\"400\"]}",
        "state": 0,
        "course_item_id": 38,
        "course_item": "{\"info\":\"公司接到一份订单，需要生产如图所示的饮品包装盒，要求其中一个面是等边三角形，其余各面是全等的等腰三角形的棱锥。\",\"q\":[\"（1）请你制作一个满足这样的包装盒样品，在学校平台展示制作过程；\"],\"bmj\":\"（2）根据你的制作，计算该包装盒至少需要多少平方厘米的材料？（接口与损耗忽略不计，数值精确到0.1平方厘米）\"],\"tj\":[\"（3）测算该饮品包装盒最多能装多少毫升的饮品？（数值精确到1毫升）\"],\"num\":\"体积1\"}"
      },
      {
        "course_id": 3,
        "if_handle": -1,
        "course_type": 5,
        "state": 0,
        "course_item_id": 45,
        "course_item": "{\"q\":[\"请说明如图所示的三棱锥每条边线的关系\"],\"num\":\"1\"}"
      },
      {
        "course_id": 3,
        "if_handle": -1,
        "course_type": 4,
        "answer": "{\"a\":[\"1800\",\"1800\",\"1800\",\"1800\",\"1800\"]}",
        "state": 0,
        "course_item_id": 46,
        "course_item": "{\"q\":[\"题目01:三棱柱底长为25M 宽为12M 高约6米，它的体积是多少？\",\"题目02:三棱柱底长为25M 宽为12M 高约6米，它的体积是多少？\",\"题目03:三棱柱底长为25M 宽为12M 高约6米，它的体积是多少？\",\"题目04:三棱柱底长为25M 宽为12M 高约6米，它的体积是多少？\",\"题目05:三棱柱底长为25M 宽为12M 高约6米，它的体积是多少？\"],\"num\":\"1\"}"
      }
    ]
  }

  var str = {
    "info":"公司接到一份订单，需要生产如图所示的饮品包装盒，要求其中一个面是等边三角形，其余各面是全等的等腰三角形的棱锥。",
  "q":["（1）请你制作一个满足这样的包装盒样品，在学校平台展示制作过程；"],
  "bmj":"（2）根据你的制作，计算该包装盒至少需要多少平方厘米的材料？（接口与损耗忽略不计，数值精确到0.1平方厘米）"],
  "tj":["（3）测算该饮品包装盒最多能装多少毫升的饮品？（数值精确到1毫升）"],
  "num":"体积1"};




var params = {
    token: '能获取',
    batch: '能获取',
    exams: [
        {
            "answer": "string", //[{\"a\":[\"A\",\"B\",\"D\",\"C\",\"E\"]}]
            "classBatch": "string", //外面的batch
            "courseItemId": 0, //这个就是一个值，多个题目的话exams是多个元素
            "createTime": "2018-12-26T05:44:43.398Z",
            "id": 0,
            "isRight": 0,//0正确-1错误或不全对
            "score": "string", // 单个题的成绩
            "useTime": 0,
            "userLoginname": "string"
        }
    ]
}


  var params = {
      token:'能获取',
      batch:'能获取',
      exams:[
        {
          "answer": "string", //[{\"a\":[\"A\",\"B\",\"D\",\"C\",\"E\"]},{\"a\":[\"A\",\"B\",\"D\",\"C\",\"E\"]},{\"a\":[\"A\",\"B\",\"D\",\"C\",\"E\"]}]这样子的格式么
          "classBatch": "string", //这个是什么？？？
          "courseItemId": 0, //这个多个题目的话是[1,2,3,4]这样子么？
          "createTime": "2018-12-26T05:44:43.398Z",
          "id": 0,
          "isRight": 0,//[1,1,0,1,1]//这样子？
          "score": "string", // 2+3+1 = 6 返回一个总数6给你？还是[2,3,1]?
          "useTime": 0, 
          "userLoginname": "string"
        }
      ]
  }


//   [
//     {
//       "answer": "string",
//       "classBatch": "string",
//       "courseItemId": 0,
//       "createTime": "2018-12-28T15:59:07.815Z",
//       "id": 0,
//       "isRight": 0,
//       "score": "string",
//       "useTime": 0,
//       "userLoginname": "string"
//     }
//   ]


  /**
   * 提交的答案说明
   */
// var paramd = {
//     token: '能获取',
//     batch: '能获取',
//     exams: [
//         {
//             "answer": "[{"a":["A","B","D","C","E"]}]",
//             "classBatch": "string", //外面的batch
//             "courseItemId": 1,
//             "isRight": 0,
//             "score": "5",
//             "useTime": 0,
//             "userLoginname": "qj"
//         },
//         {
//             "answer": "[{"a":["A"]}]",
//             "classBatch": "string", //外面的batch
//             "courseItemId": 2,
//             "isRight": -1,
//             "score": "0",
//             "useTime": 0,
//             "userLoginname": "qj"
//         }
//     ]
// }
// gsMgs:{
//     index:'',
//     rindex:'',
//     answer:'',
//     score:'',
//     courseItemId:'',
//     type:''
// }

"[{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":24},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":25},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":37},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":38},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":45},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":46},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":50},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":51},{"answer":"","isRight":0,"classBatch":"88","userLoginname":"漆静01","courseItemId":52}]"
/**
 * 事件对象 记录当前题目的答案
 * 回答第几题
 * 当前问题的索引
 * 答案
 * 得分
 * 课程的id
 * 问题类型
 */
// switch(type) {
//     case 'a':
//         this.list[index].a.arr[nowIndex] = obj;
//         break;
//      case 'bmj':
//         this.list[index].bmj.arr[nowIndex] = obj;
//         break;
//     case 'tj':
//         this.list[index].tj.arr[nowIndex] = obj;
//         break;
//     case 'gs':
//         this.list[index].gs.arr[nowIndex] = obj;
//         break;
//     default:
//         return;
// }
// list:function() {
//     var obj = {};
//     this.questList.forEach((item,index) => {
//         obj[index] = {};
//         obj['a'][index].arr = [];  //具体的答案和得分情况
//         obj['bmj'][index].arr = [];  //具体的答案和得分情况
//         obj['tj'][index].arr = [];  //具体的答案和得分情况
//         obj['gs'][index].arr = [];  //具体的答案和得分情况
//     })
//     return obj;
// },





// [
//     {
//       "answer": "string",
//       "classBatch": "string",
//       "courseItemId": 0,
//       "createTime": "2018-12-28T05:16:31.203Z",
//       "id": 0,
//       "isRight": 0,
//       "score": "string",
//       "useTime": 0,
//       "userLoginname": "string"
//     }
//   ]

// answer: "A"
// courseItemId: 3
// isRight: true
// score: 1


 // var obj = {};
// for(var i = 1; i < 20; i++){
//     var tmp = (i < 10 ? "0" + i : i);
//     var str = "goods" + tmp;
//     var val = "10" + tmp;
//     obj[str] = val;
// }
// console.log(obj);


/**
 * 答题记录
 * 用一个数组对象来存储
 * 答题时 记录当前题目的course_id  选择的答案序号  计算得分情况
 *   
 * 
 */
/**
 * index 当前的答案的序号
 * rindex 第几个问题
 * total 一共有多少个问题
 * course_id 当前课程的id  
 * score 正确的分数
 * answer 正确的答案
 */

/**
 * 项目注意的地方:
 * gsMgs:{
        index:'',
        rindex:'',
        total:'',
        courseItemId:'',
        score:'',
        answer:''
    }
 */

 /**
  * 子传父组：
  * 子定义事件.$emit('父组件事件',参数)
  * 
  * 父传子：
  * 
  */
[{ "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 24 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 25 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 37 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 38 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 45 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 46 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 50 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 51 }, { "answer": "", "isRight": 0, "classBatch": "88", "userLoginname": "漆静01", "courseItemId": 52 }]


let person = {
    defaultname:'tom',
    get name(){
        return this.defaultname;
    },
    set name(val){
        this.defaultname = val;
    }
}




self.$layer.confirm('网络错误，请稍后再试',{
    title:'温馨提示'
});

//async 作为关键字 放在函数前面  表示函数是一个异步函数  因为anync是一个异步函数  因为async 就是异步的意思
// 异步函数也就意味着该函数的执行不会阻塞后面代码的执行  
async function timeout() {
    return 'hello world'
}

timeout().then(result => {
    console.log(result)
})

async function timeout(flag) {
    if(flag) {
        return 'hello world'
    } else {
        throw 'my god failure'
    }
}

timeout(false).catch(err => {
    console.log(err)
})
/**
 * await 只能放到async 函数里面
 */
function doubleAfter2seconds(num) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(2*num)
        },2000)
    })
}

/**
 * 再写一个async 函数  从而可以使用await 关键字  await 后面放置的就是返回promise对象的一个表达式 
 */

 async function testResult() {
     let result = await doubleAfter2seconds(30);
     console.log(result)
 }

async function testResult() {
    let first = await doubleAfter2seconds(30);
    let second = await doubleAfter2seconds(50);
    let third = await doubleAfter2seconds(30);
    console.log(first+second+third)
}

const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(3000, () => {
    console.log('server start')
})

app.post('/phoneLocation',(req,res) => {
    setTimeout(() => {
        res.json({
            success:true,
            obj:{
                provice:'广东',
                city:'深圳'
            }
        },1000)
    })
})

app.post()

var plusReady = function (callback) {
    window.IsSureQuit = false;
    plus.key.addEventListeener('backbutton',function() {
       //得到当前窗口对象
        var curentWebview = plus.webview.currentWebview()
       //判断窗口是否有可后退的历史记录 如果有 则后退  没有就关闭当前窗口
    //    如果是入口页面  就执行退出的逻辑
        curentWebview.canBack(evt => {
           if(evt.canBack) {
               router.go(-1)
           }else{
               if(window.isSecurQuit) {
                   plus.runtime.quit()
               }else{
                   window.isSecurQuit = true
                   setTimeout(() => {
                       window.isSecurQuit = false
                   },2000)
               }
           }
       }) 
    })
}



var plusReady = function(callback) {
    if(window.plus) {
        callback()
    }else{
        document.addEventListener('plusready',callback)
    }
}

plusReady(function() {
    var firstBack = 0;
    var hanleBack = function() {
        var curentWebview = plus.webview.curentWebview();
        var topWebview = plus.webview.getTopWebview();
        var now = Date.now || function() {
            return new Date().getTime()
        }
        //查看当前窗口对象有没有返回
        curentWebview.callback(function(evt) {
            if(curentWebview.id === plus.runtime.appid) {
                if(!firstBack) {
                    firstBack = now()
                    plus.nativeUI.toast('再按一次退出应用')
                    setTimeout((function() {
                        firstBack = 0;
                    },2000))
                }else if(now() - firstBack < 2000){
                    plus.runtime.quit()
                }
            } else {
                if(evt.canBack) {
                    history.back();
                }else{
                    currentWebview.close('auto')
                }
            }
        })
    }
})

//模式不同 需要取的值也不一样 
var path = location.path;
var hash = location.hash;
if(path === '/') {
    plus.runtime.quit();
}else{
    router.go(-1) //history.back()
}