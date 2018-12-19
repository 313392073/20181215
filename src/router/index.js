import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Reg from '@/components/Reg'
import Transition from '@/components/Transition'
import Show from '@/components/Show'
import Echart from '@/components/Echart'
import Echart2 from '@/components/Echart2'
import Echart3 from '@/components/Echart3'
import Echart4 from '@/components/Echart4'
import Echart5 from '@/components/Echart5'

// 路由start
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

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/', 
      name:'RegPage',
      component:RegPage
    },
    {
      path:'/reg', 
      name:'RegPage',
      component:RegPage
    },
    {
      path:'/login', 
      name:'Login',
      component:Login
    },
    {
      path:'/findpwd', 
      name:'FindPwd',
      component:FindPwd
    },
    {
      path:'/sideareaformula', 
      name:'SideAreaFormula',
      component:SideAreaFormula
    },
    {
      path:'/regularareaformula', 
      name:'RegularAreaFormula',
      component:RegularAreaFormula
    },
    {
      path:'/videdetail', 
      name:'VideDetail',
      component:VideDetail
    },
    {
      path:'/taskdetail', 
      name:'TaskDetail',
      component:TaskDetail
    },
    {
      path:'/linerelation', 
      name:'LineRelation',
      component:LineRelation
    },
    {
      path:'/aftclaexp', 
      name:'AftClaExp',
      component:AftClaExp
    },
    {
      path:'/videoshare', 
      name:'VideoShare',
      component:VideoShare
    },
    {
      path:'/findpyramid', 
      name:'FindPyramid',
      component:FindPyramid
    },
    {
      path:'/makepyramid', 
      name:'MakePyramid',
      component:MakePyramid
    },
    {
      path:'/homeworkproblems', 
      name:'HomeworkProblems',
      component:HomeworkProblems
    },
    {
      path:'/coursemanagement', 
      name:'CourseManagement',
      component:CourseManagement
    },
    {
      path:'/praafterclass', 
      name:'PraafterClass',
      component:PraafterClass
    },
    {
      path:'/classlearning', 
      name:'ClassLearning',
      component:ClassLearning
    },
    {
      path:'/learningreport', 
      name:'LearningReport',
      component:LearningReport
    },
    {
      path:'/testreport', 
      name:'TestReport',
      component:TestReport
    },
    {
      path: '/practicreport',
      name: 'PracticReport',
      component: PracticReport
    },
    {
      path: '/jobresults',
      name: 'JobResults',
      component: JobResults
    },
    {
      path: '/classtotalresult',
      name: 'ClassTotalResult',
      component: ClassTotalResult
    },
    {
      path: '/assigngroup',
      name: 'AssignGroup',
      component: AssignGroup
    },
    {
      path: '/assigngroupcase',
      name: 'AssignGroupCase',
      component: AssignGroupCase
    },
    {
      path: '/teahomeworkshare',
      name: 'TeaHomeworkShare',
      component: TeaHomeworkShare
    },
    {
      path: '/teasharedetail',
      name: 'TeaShareDetail',
      component: TeaShareDetail
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
    // {
    //   path: '/echart',
    //   name: 'Echart',
    //   component: Echart
    // },
    // {
    //   path: '/echart2',
    //   name: 'Echart2',
    //   component: Echart2
    // },
    // {
    //   path: '/echart3',
    //   name: 'Echart3',
    //   component: Echart3
    // },
    // {
    //   path: '/echart4',
    //   name: 'Echart4',
    //   component: Echart4
    // },
    // {
    //   path: '/echart5',
    //   name: 'Echart5',
    //   component: Echart5
    // }
  ]
})
