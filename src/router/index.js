import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import HelloWorld from '@/components/HelloWorld'
import Reg from '@/components/Reg'
import Transition from '@/components/Transition'
import Show from '@/components/Show'
import Echart from '@/components/Echart'
import Echart2 from '@/components/Echart2'
import Echart3 from '@/components/Echart3'
import Echart4 from '@/components/Echart4'
import Echart5 from '@/components/Echart5'
import Echart6 from '@/components/Echart6'

// 路由start
import SelectId from '@/pages/SelectId'//注册
import RegPage from '@/pages/RegPage'//注册
import Login from '@/pages/Login'//登录
import FindPwd from '@/pages/FindPwd'//找回密码
import SideAreaFormula from '@/pages/SideAreaFormula'//正棱锥侧面积
import RegularAreaFormula from '@/pages/RegularAreaFormula'//正棱锥表面积
import VideDetail from '@/pages/VideDetail'//视频详情
import TaskDetail from '@/pages/TaskDetail'// 任务详情
import LineRelation from '@/pages/LineRelation'//线线关系
import AftClaExp from '@/pages/AftClaExp'//课后实验
import VideoShare from '@/pages/VideoShare'//视频分享
import FindPyramid from '@/pages/FindPyramid'//寻找棱锥
import MakePyramid from '@/pages/MakePyramid'//制作棱锥
import HomeworkProblems from '@/pages/HomeworkProblems'//课后习题
import CourseManagement from '@/pages/CourseManagement'//课件管理
import PraafterClass from '@/pages/PraafterClass'//课后练习
import ClassLearning from '@/pages/ClassLearning'//课堂学习
import LearningReport from '@/pages/LearningReport'//课堂学习成绩报告(学生) 
import TestReport from '@/pages/TestReport'//课堂学习成绩报告(学生) 
import PracticReport from '@/pages/PracticReport'// 在线测试学生练习结果(学生)
import JobResults from '@/pages/JobResults'   // 作业结果(学生) 
import ClassTotalResult from '@/pages/ClassTotalResult'    // 课堂学习测试结果统计报告
import AssignGroup from '@/pages/AssignGroup'    // 分配小组
import AssignGroupCase from '@/pages/AssignGroupCase'    // 小组分配情况
import TeaHomeworkShare from '@/pages/TeaHomeworkShare'    // 老师端作业分享1
import TeaShareDetail from '@/pages/TeaShareDetail'    // 老师端作业分享2
import ExpregPyramid from '@/pages/ExpregPyramid'    // 探索正三棱锥
import CalSurfaceArea from '@/pages/CalSurfaceArea'    // 计算表面积
import RegularPyramidTotal from '@/pages/RegularPyramidTotal'    // 第一次计算表面积数据统计
import RegCheckTotal from '@/pages/RegCheckTotal'    // 正棱锥表面积检测数据统计
import AfterExpTotal from '@/pages/AfterExpTotal'    // 课后实验成绩统计
import CourseSet from '@/pages/CourseSet'    // 课后安排设置

Vue.use(Router)

const router = new Router({
  mode: 'history', //打包的时候需要把这个注释掉  不然图片的路径找不到
  routes: [
    // {
    //   path:'/', 
    //   name:'SideAreaFormula',
    //   component:SideAreaFormula,
    //   // meta:{
    //   //   title:'首页',
    //   //   auth:true
    //   // }
    // },
    {
      path:'/selectid', 
      name:'SelectId',
      component:SelectId,
      meta:{
        title:'选择身份'
      }
    },
    {
      path:'/reg', 
      name:'RegPage',
      component:RegPage,
      meta:{
        title:'注册页面'
      }
    },
    {
      path:'/login', 
      name:'Login',
      component:Login,
      meta:{
        title:'登录页面'
      }
    },
    {
      path:'/findpwd', 
      name:'FindPwd',
      component:FindPwd,
      meta:{
        title:'找回密码'
      }
    },
    {
      path:'/sideareaformula', 
      name:'SideAreaFormula',
      component:SideAreaFormula,
      meta:{
        title:'正棱锥侧面积',
        auth:true
      }
    },
    {
      path:'/regularareaformula', 
      name:'RegularAreaFormula',
      component:RegularAreaFormula,
      meta:{
        title:'正棱锥表面积',
        auth:true
      }
    },
    {
      path:'/videdetail', 
      name:'VideDetail',
      component:VideDetail,
      meta:{
        title:'视频详情',
        auth:true
      }
    },
    {
      path:'/taskdetail', 
      name:'TaskDetail',
      component:TaskDetail,
      meta:{
        title:'任务详情',
        auth:true
      }
    },
    {
      path:'/linerelation', 
      name:'LineRelation',
      component:LineRelation,
      meta:{
        title:'线线关系',
        auth:true
      }
    },
    {
      path:'/aftclaexp', 
      name:'AftClaExp',
      component:AftClaExp,
      meta:{
        title:'课后实验',
        auth:true
      }
    },
    {
      path:'/videoshare', 
      name:'VideoShare',
      component:VideoShare,
      meta:{
        title:'视频分享',
        auth:true
      }
    },
    {
      path:'/findpyramid', 
      name:'FindPyramid',
      component:FindPyramid,
      meta:{
        title:'寻找棱锥',
        auth:true
      }
    },
    {
      path:'/makepyramid', 
      name:'MakePyramid',
      component:MakePyramid,
      meta:{
        title:'制作棱锥',
        auth:true
      }
    },
    {
      path:'/homeworkproblems', 
      name:'HomeworkProblems',
      component:HomeworkProblems,
      meta:{
        title:'课后习题',
        auth:true
      }
    },
    {
      path:'/coursemanagement', 
      name:'CourseManagement',
      component:CourseManagement,
      meta:{
        title:'课件管理',
        auth:true
      }
    },
    {
      path:'/praafterclass', 
      name:'PraafterClass',
      component:PraafterClass,
      meta:{
        title:'课后练习',
        auth:true
      }
    },
    {
      path:'/classlearning', 
      name:'ClassLearning',
      component:ClassLearning,
      meta:{
        title:'课堂学习',
        auth:true
      }
    },
    {
      path:'/learningreport', 
      name:'LearningReport',
      component:LearningReport,
      meta:{
        title:'课堂学习成绩报告(学生)',
        auth:true
      }
    },
    {
      path:'/testreport', 
      name:'TestReport',
      component:TestReport,
      meta:{
        title:'课堂学习成绩报告(学生)',
        auth:true
      }
    },
    {
      path: '/practicreport',
      name: 'PracticReport',
      component: PracticReport,
      meta:{
        title:'在线测试学生练习结果(学生)',
        auth:true
      }
    },
    {
      path: '/jobresults',
      name: 'JobResults',
      component: JobResults,
      meta:{
        title:'作业结果(学生)',
        auth:true
      }
    },
    {
      path: '/classtotalresult',
      name: 'ClassTotalResult',
      component: ClassTotalResult,
      meta:{
        title:'课堂学习测试结果统计报告',
        auth:true
      }
    },
    {
      path: '/assigngroup',
      name: 'AssignGroup',
      component: AssignGroup,
      meta:{
        title:'分配小组',
        auth:true
      }
    },
    {
      path: '/assigngroupcase',
      name: 'AssignGroupCase',
      component: AssignGroupCase,
      meta:{
        title:'分配小组情况',
        auth:true
      }
    },
    {
      path: '/teahomeworkshare',
      name: 'TeaHomeworkShare',
      component: TeaHomeworkShare,
      meta:{
        title:'老师端作业分享1',
        auth:true
      }
    },
    {
      path: '/teasharedetail',
      name: 'TeaShareDetail',
      component: TeaShareDetail,
      meta:{
        title:'老师端作业分享2',
        auth:true
      }
    },
    {
      path: '/expregpyramid',
      name: 'ExpregPyramid',
      component: ExpregPyramid
    },
    {
      path: '/calsurfacearea',
      name: 'CalSurfaceArea',
      component: CalSurfaceArea,
      meta:{
        title:'计算表面积',
        auth:true
      }
    },
    {
      path: '/regularpyramidtotal',
      name: 'RegularPyramidTotal',
      component: RegularPyramidTotal,
      meta:{
        title:'第一次计算表面积数据统计',
        auth:true
      }
    },
    {
      path: '/regchecktotal',
      name: 'RegCheckTotal',
      component: RegCheckTotal,
      meta:{
        title:'正棱锥表面积检测数据统计',
        auth:true
      }
    },
    {
      path: '/afterexptotal',
      name: 'AfterExpTotal',
      component: AfterExpTotal,
      meta:{
        title:'课后实验成绩统计',
        auth:true
      }
    },
    {
      path: '/courseset',
      name: 'CourseSet',
      component: CourseSet,
      meta:{
        title:'课后安排设置',
        auth:true
      }
    },

    // {
    //   path: '/reg',
    //   name: 'Reg',
    //   component: Reg
    // },
    // {
    //   path: '/test',
    //   name: 'Transition',
    //   component: Transition
    // },
    // {
    //   path: '/show',
    //   name: 'Show',
    //   component: Show
    // },
    {
      path: '/echart',
      name: 'Echart',
      component: Echart
    },
    {
      path: '/echart2',
      name: 'Echart2',
      component: Echart2
    },
    {
      path: '/echart3',
      name: 'Echart3',
      component: Echart3
    },
    {
      path: '/echart4',
      name: 'Echart4',
      component: Echart4
    },
    {
      path: '/echart5',
      name: 'Echart5',
      component: Echart5
    },
    {
        path: '/echart6',
        name: 'Echart6',
        component: Echart6
      }
  ]
})

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title?to.meta.title:'棱锥'
//   if(to.matched.some( r => r.meta.auth)){
//     if(store.state.token){ //toke存在  还需要判断user 登录没有
//       if(store.state.user) {
//         next()
//       }else{
//         next({
//           path:'/login',
//           query:{redirect:to.fullPath}
//         })
//       }
//     }else{ 
//       if(to.name == '/login' || to.name == 'reg' || to.name == 'findpwd'){
//         next();
//         return;
//       }else{
//         //token 不存在  直接重新登录
//         next({
//           path:'/login',
//           query:{redirect:to.fullPath}
//         })
//       }
//     }
//   }else{
//     next()
//   }
  
// })

export default router