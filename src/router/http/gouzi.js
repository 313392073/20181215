// 全局钩子函数 (全局有效的函数)
router.beforeEach((to,from,next) => {
    let token = router.app.$storage.fetch('token');
    let needAuth = to.matched.some(item => item.meta.login);
    if(!token && needAuth) {
        return next({path:'/login'})
        next();
    }
})


router.beforeEach((to,from,next) => {
    if(to.meta.requireAuth) { //判断该路由是需要登录权限的
        if(StorageEvent.state.token) { //通过vuex state获取当前的token 是否存在
            next()
        }else{
            //requireAuth 验证通过了 但是token 不存在   进行的操作是
            // 先跳转到登录页面  进行登录  登录成功后跳转到目标路由（qurey ：目标路由）
            next({
                path:'/login',
                query:{redirect:to.fullPath} //将跳转的路由path作为参数  登录成功后跳转到该路由
            })
        }
    }else{
        next()
    }
})

//路由拦截器 




//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response) {
            switch(error.response.status){
                case 401:
                //返回401 清除token信息并跳转到登录页面
                store.commit(types.LOGOUT);
                router.replace({
                    path:'/login',
                    query:{redirect:router.currentRoute.fullPath}
                })
            }
        }
        return Promise.reject(error.response.data) //返回接口返回的错误信息
    }
)

//页面刷新  重新赋值token
if(window.localStorage.getItem('token')){
    store.commit(types.LOGIN,window.localStorage.getItem('token'))
}

/**
 * some() 测试数组中的某些元素是否通过由提供的函数实验的测试
 */
router.beforeEach((to,from,next) => {
     //根据字段判断是否路由过滤
    if(to.matched.some(r => r.meta.requireAuth)){
        if(store.state.token){
            next()
        }else{
            next({
                path:'/login',
                query:{redirect:to.fullPath}
            })
        }
    }else{
        next();
    }
})


router.beforeEach((to,from,next) => {
    //根据字段判断是否路由过滤
    if(to.matched.some( r => r.meta.requireAuth)){
        if(store.state.token != null){
            next()
        }else{
            if(to.name === 'login'){
                next();
                return;
            }else{
                next({
                    path:'/login',
                    query:{}
                })
            }
        }
    }
})


export default new Vuex.Store({
    state:{
        user:{},
        token:null,
        titlee:''
    },
    mutations:{
        [type.LOGIN]:(state,data) => {
            localStorage.token = data;
            state.token = data;
        },
        [type.LOGOUT]:(state) => {
            localStorage.removeItem('token');
            state.token = null;
        },
        [types.TITLE]:(state,data) => {
            state.title = data;
        }
    }
})













/**
 * next ：function  一定要调用该方法来resolve这个钩子  执行效果依赖next 方法的调用参数
 * next()  进行管道中的下一个钩子  如果全部钩子执行完了  则导航的状态就是confirmed（确认的）
 * next(false) 中断当前的导航  如果浏览器的url 改变了（用户手动刷新或者按后退的按键） 那么url会重置到fom路由对应的地址
 * 
 * next('/') 或者next({path:'/'}):跳转到一个不同的地址  当前的导航被中端 然后进行一个新的导航
 */

beforeEach(to,from,next)
//to:router 即将进入的路由对象
//from 当前导航 即将离开的路由
//next :function 进行管道中的一个钩子  如果执行完了  则导航的状态是confirmed（确认的）
// 否则为false 终止导航 


afterEach()
//函数没有next()

//某个路由的钩子函数  写在某个路由里面的函数  本质上和组件内函数没有区别
const router = new VueRouter({
    routes: [
        {
            path:'/login',
            component:Login,
            beforeEnter:(to,from,next) => {

            },
            boforeLeave:(to,from,next) => {

            }
        }
    ]
})

/**
 * 路由组件的钩子
 * （路由组件） 组件路由属于组件  但组件不等同于路由组件   所谓路由组件  是直接定义在router和component处的组件
 * 
 * */
var router = [
    {
        path:'/home',
        component:home,
        name:'home'
    }
]

//钩子函数的用法： 它是和data  methods平级的
{
    beforeRouteLeave(to, from, next) {
        next()
    },
    beforeRouteEnter(to, from, next) {
        next()
    },
    beforeRouteUpdate(to, from, next) {
        next()
    },
    data:{},
    method: {}
}

// vue-router 的路由跳转的方法

// 第一种： 编程式的导航
/**
 * <router-link to='/' tag='p'></router-link>
 * to 是一个prop 指定需要跳转的路径 也可以使用v-bind动设置
 * tag 可以指定渲染成的标签  默认是a标签
 * <router-link to='/' replace></router-link>
 * 这样的写法是不会留下历史痕迹  回退键无效
 * 
 * <router-link :to="name:'product',params:{id:1}"></router-link>
 * 
 * 路由的格式: /product/1
 */

 /**
  * 函数式导航  这里假设 我要跳转product页面并且附带参数id
  * 这里定义好了list.id  就是动态的值
  * 
  * this.$router.push('./product/'+list.id) //字符串的方式进行描述
  * this.$router.push({name:'product',params:{id:list.id}}) //命名的路由的方式进行描述
  * this.$router.push({path:`/product/${list.id}`}) //直接定义path 类似第一种
  * 
  * 带查询参数
  * router.push({path:'product',query:{id:list.id}})//   '/product?id=1'
  * 
  * 
  * router.replace 不会像history 添加新纪录  而是跟他的方法名称一样  替换掉当前的history记录
  * 
  * router.go(1) 在浏览器记录里面前进一步  等于history.forward()
  * 
  * router.go(-1) 后退一步记录  等同于history.back()
  * router.go(n)  浏览器记录前进3步
 */