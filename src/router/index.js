import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

// import Echart from '@/components/Echart'
// import Echart2 from '@/components/Echart2'
// import Echart3 from '@/components/Echart3'
// import Echart4 from '@/components/Echart4'
// import Echart5 from '@/components/Echart5'
// import Echart6 from '@/components/Echart6'
import Tips from '@/components/Tips' //评论demo
import Tree from '@/components/Tree' //评论demo
import Test from '@/components/Test' //评论demo
import Draw from '@/components/Draw'//找回密码
import Upload from '@/components/Upload'//找回密码
import CountDown from '@/common/CountDown'//找回密码
// 路由start
import SelectId from '@/pages/SelectId'//注册
import RegPage from '@/pages/RegPage'//注册
import Login from '@/pages/Login'//登录
import FindPwd from '@/pages/FindPwd'//找回密码

//老师 start
import SelectClass from '@/pages/teacher/SelectClass'// 开课选择
import SelectUnit from '@/pages/teacher/SelectUnit'// 课程重开
import SelectChange from '@/pages/teacher/SelectChange'// 课程模块调整
import CourseHistory from '@/pages/teacher/CourseHistory'// 课程历史

import PracticReport from '@/pages/teacher/PracticReport'// 在线测试(老师)
import LookingForPyramid from '@/pages/teacher/lookingforpyramid'    // 寻找棱锥
import MakePyramid from '@/pages/teacher/MakePyramid'// 制作棱锥
import HomeworkShare from '@/pages/teacher/HomeworkShare'    //作业分享1
import ShareDetail from '@/pages/teacher/ShareDetail'    // 作业分享2

import VideoShared from '@/pages/teacher/VideoShared'//视频分享
import VideDetail from '@/pages/teacher/VideDetail'//视频详情

import CalSurfaceArea from '@/pages/teacher/CalSurfaceArea'    // 表面积公式

import RegularPyramidTotal from '@/pages/teacher/RegularPyramidTotal'    // 计算表面积
import RegCheckTotal from '@/pages/teacher/RegCheckTotal'    // 正棱锥表面积检测数据统计

import RegularVolume from '@/pages/teacher/RegularVolume'    // 计算体积
import RegularVolumeTotal from '@/pages/teacher/RegularVolumeTotal'    // 计算体积统计

import ClassTotalResult from '@/pages/teacher/ClassTotalResult'    // 课堂总结
import PraafterClass from '@/pages/teacher/PraafterClass'//课后习题
import CourseManagement from '@/pages/teacher/CourseManagement'//课后习题（课件管理）
import AfterExpTotal from '@/pages/teacher/AfterExpTotal'    // 课后实验成绩统计
import StudentDetail from '@/pages/teacher/StudentDetail'    // 查看学生答题详情
import TchUploadList from '@/pages/teacher/UploadPicList'    // 学生端上传详情
// 老师-end

//学生start
import CourseShistory from '@/pages/student/CourseShistory'// 学生课程历史
import OnlineTest from '@/pages/student/OnlineTest'//在线测试
import TestReport from '@/pages/student/TestReport'//课堂学习成绩报告(学生) 
import AssignGroupCase from '@/pages/student/AssignGroupCase'    // 寻找棱锥（学生）
import UploadPic from '@/pages/student/UploadPic'//上传图片
import UploadPicList from '@/pages/student/UploadPicList'//上传图片列表
import PicDetail from '@/pages/student/PicDetail'//图片详情
import MakePyramids from '@/pages/student/MakePyramids'//制作棱锥
import JobResults from '@/pages/student/JobResults'   // 作业结果(学生) 
import StuHomeworkShare from '@/pages/student/StuHomeworkShare'   // 作业分享
import StuShareDetail from '@/pages/student/StuShareDetail'   // 作业分享详情
import VideoShare from '@/pages/student/VideoShare'//视频分享
import UploadVideoList from '@/pages/student/UploadVideoList'//视频分享
import SideAreaFormula from '@/pages/student/SideAreaFormula'//侧面积公式
import RegularAreaFormula from '@/pages/student/RegularAreaFormula'//表面积公式
import VolumeFormula from '@/pages/student/VolumeFormula'//体积公式
import ExpregPyramid from '@/pages/student/ExpregPyramid'    // 线线关系
import LearningReport from '@/pages/student/LearningReport'//课堂总结(学生)
import ClassLearning from '@/pages/student/ClassLearning'//课堂总结(课堂学习)
import Exercise from '@/pages/student/Exercise'//课后习题
import AftClaExp from '@/pages/student/AftClaExp'//课后实验
//学生start
import LineRelation from '@/pages/LineRelation'//线线关系
import CourseSet from '@/pages/CourseSet'    // 课后安排设置

Vue.use(Router)

const router = new Router({
  // mode: 'history', //打包的时候需要把这个注释掉  不然图片的路径找不到
  routes: [
    {
      path: '/time',
      name: 'Times',
      component: CountDown,
      meta: {
        title: '倒计时'
      }
    },
    {
      path: '/tips',
      name: 'Tips',
      component: Tips,
      meta: {
        title: '拍照上传'
      }
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
      meta: {
        title: '拍照上传'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        title: '测试页面'
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录页面'
      }
    },
    {
      path: '/selectId',
      name: 'SelectId',
      component: SelectId,
      meta: {
        title: '选择身份'
      }
    },
    {
      path: '/reg',
      name: 'RegPage',
      component: RegPage,
      meta: {
        title: '注册页面'
      }
    },
    {
      path: '/findpwd',
      name: 'FindPwd',
      component: FindPwd,
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/courseset',
      name: 'CourseSet',
      component: CourseSet,
      meta: {
        title: '课后安排设置',
        auth: true
      }
    },
    {
      path: '/linerelation',
      name: 'LineRelation',
      component: LineRelation,
      meta: {
        title: '线线关系',
        auth: true
      }
    },
    { //老师 start
      path: '/teacoursehistory',
      name: 'CourseHistory',
      component: CourseHistory,
      meta: {
        title: '课程历史',
        auth: true
      }
    },
    { 
      path: '/teaselectclass',
      name: 'SelectClass',
      component: SelectClass,
      meta: {
        title: '老师选课',
        auth: true
      }
    },
    { 
      path: '/teaselectunit',
      name: 'SelectUnit',
      component: SelectUnit,
      meta: {
        title: '老师重开',
        auth: true
      }
    },
    { 
      path: '/teaselectchange',
      name: 'SelectChange',
      component: SelectChange,
      meta: {
        title: '老师模块调整',
        auth: true
      }
    },
    { 
      path: '/teapracticreport',
      name: 'PracticReport',
      component: PracticReport,
      meta: {
        title: '在线测试(学生)',
        auth: true
      }
    },
    {
      path: '/tealookingforpyramid',
      name: 'LookingForPyramid',
      component: LookingForPyramid,
      meta: {
        title: '寻找棱锥',
        auth: true
      }
    },
    {
      path: '/teamakepyramid',
      name: 'MakePyramid',
      component: MakePyramid,
      meta: {
        title: '制作棱锥',
        auth: true
      }
    },
    {
      path: '/teahomeworkshare',
      name: 'HomeworkShare',
      component: HomeworkShare,
      meta: {
        title: '作业分享',
        auth: true
      }
    },
    {
      path: '/teasharedetail',
      name: 'ShareDetail',
      component: ShareDetail,
      meta: {
        title: '作业分享2',
        auth: true
      }
    },
    {
      path: '/teavideoshared',
      name: 'VideoShared',
      component: VideoShared,
      meta: {
        title: '视频分享',
        auth: true
      }
    },
    {
      path: '/teavidedetail',
      name: 'VideDetail',
      component: VideDetail,
      meta: {
        title: '视频详情',
        auth: true
      }
    },
    {
      path: '/teacalsurfacearea',
      name: 'CalSurfaceArea',
      component: CalSurfaceArea,
      meta: {
        title: '表面积公式',
        auth: true
      }
    },
    {
      path: '/tearegularpyramidtotal',
      name: 'RegularPyramidTotal',
      component: RegularPyramidTotal,
      meta: {
        title: '计算表面积',
        auth: true
      }
    },
    {
      path: '/tearegchecktotal',
      name: 'RegCheckTotal',
      component: RegCheckTotal,
      meta: {
        title: '计算表面积',
        auth: true
      }
    },
    {
      path: '/tearegularvolume',
      name: 'RegularVolume',
      component: RegularVolume,
      meta: {
        title: '计算体积',
        auth: true
      }
    },
    {
      path: '/tearegularvolumetotal',
      name: 'RegularVolumeTotal',
      component: RegularVolumeTotal,
      meta: {
        title: '计算体积统计',
        auth: true
      }
    },
    {
      path: '/teaclasstotalresult',
      name: 'ClassTotalResult',
      component: ClassTotalResult,
      meta: {
        title: '课堂总结',
        auth: true
      }
    },
    {
      path: '/teapraafterclass',
      name: 'PraafterClass',
      component: PraafterClass,
      meta: {
        title: '课后习题',
        auth: true
      }
    },
    {
      path: '/teacoursemanagement',
      name: 'CourseManagement',
      component: CourseManagement,
      meta: {
        title: '课后习题(课件管理)',
        auth: true
      }
    },
    {
      path: '/teaafterexptotal',
      name: 'AfterExpTotal',
      component: AfterExpTotal,
      meta: {
        title: '课后实验成绩统计',
        auth: true
      }
    }, //老师end
    { //学生start
      path: '/stucoursehistory',
      name: 'CourseShistory',
      component: CourseShistory,
      meta: {
        title: '课程历史',
        auth: true
      }
    }, 
    { 
      path: '/stuonlinetest',
      name: 'OnlineTest',
      component: OnlineTest,
      meta: {
        title: '在线测试',
        auth: true
      }
    },
    {
      path: '/stutestreport',
      name: 'TestReport',
      component: TestReport,
      meta: {
        title: '课堂学习成绩报告(学生)',
        auth: true
      }
    },
    {
      path: '/stuassigngroupcase',
      name: 'AssignGroupCase',
      component: AssignGroupCase,
      meta: {
        title: '寻找棱锥（学生）',
        auth: true
      }
    },
    {
      path: '/stuuploadpic',
      name: 'UploadPic',
      component: UploadPic,
      meta: {
        title: '上传图片（寻找棱锥）',
        auth: true
      }
    },
    {
      path: '/stuuploadpicList',
      name: 'UploadPicList',
      component: UploadPicList,
      meta: {
        title: '图片上传列表',
        auth: true
      }
    },
    {
      path: '/stupicdetail',
      name: 'PicDetail',
      component: PicDetail,
      meta: {
        title: '图片详情'
      }
    },
    {
      path: '/stumakepyramids',
      name: 'MakePyramids',
      component: MakePyramids,
      meta: {
        title: '制作棱锥',
        auth: true
      }
    },
    {
      path: '/stujobresults',
      name: 'JobResults',
      component: JobResults,
      meta: {
        title: '制作棱锥（作业结果）',
        auth: true
      }
    },
    {
      path: '/stuhomeworkshare',
      name: 'StuHomeworkShare',
      component: StuHomeworkShare,
      meta: {
        title: '作业分享学生'
      }
    },
    {
      path: '/stusharedetail',
      name: 'StuShareDetail',
      component: StuShareDetail,
      meta: {
        title: '作业分享详情'
      }
    },
    {
      path: '/stuvideoshare',
      name: 'VideoShare',
      component: VideoShare,
      meta: {
        title: '视频分享',
        auth: true
      }
    },
    {
      path: '/stuvidedetail',
      name: 'UploadVideoList',
      component: UploadVideoList,
      meta: {
        title: '视频详情',
        auth: true
      }
    },
    {
      path: '/stusideareaformula',
      name: 'SideAreaFormula',
      component: SideAreaFormula,
      meta: {
        title: '正棱锥侧面积',
        auth: true
      }
    },
    {
      path: '/sturegularareaformula',
      name: 'RegularAreaFormula',
      component: RegularAreaFormula,
      meta: {
        title: '正棱锥表面积',
        auth: true
      }
    },
    {
      path: '/stuvolumeformula',
      name: 'VolumeFormula',
      component: VolumeFormula,
      meta: {
        title: '正棱锥体积',
        auth: true
      }
    },
    {
      path: '/stuexpregpyramid',
      name: 'ExpregPyramid',
      component: ExpregPyramid,
      meta: {
        title: '线线关系',
        auth: true
      }
    },
    {
      path: '/stulearningreport',
      name: 'LearningReport',
      component: LearningReport,
      meta: {
        title: '课堂总结(学生)',
        auth: true
      }
    },
    {
      path: '/stuclasslearning',
      name: 'ClassLearning',
      component: ClassLearning,
      meta: {
        title: '课堂总结(课堂学习)',
        auth: true
      }
    },
    {
      path: '/stuexercise',
      name: 'Exercise',
      component: Exercise,
      meta: {
        title: '课后习题',
        auth: true
      }
    },
    {
      path: '/stuaftclaexp',
      name: 'AftClaExp',
      component: AftClaExp,
      meta: {
        title: '课后实验',
        auth: true
      }
    },
    {
      path: '/studetail',
      name: 'StudentDetail',
      component: StudentDetail,
      meta: {
        title: '学生答题详情',
        auth: true
      }
    },
    {
      path: '/tchuploadlist',
      name: 'TchUploadList',
      component: TchUploadList,
      meta: {
        title: '学生上传列表',
        auth: true
      }
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
//           path:'/',
//           query:{redirect:to.fullPath}
//         })
//       }
//     }else{ 
//       if(to.name == 'Login' || to.name == 'RegPage' || to.name == 'FindPwd' || to.name == 'SelectId'){
//         next();
//         return;
//       }else{
//         //token 不存在  直接重新登录
//         next({
//           path:'/',
//           query:{redirect:to.fullPath}
//         })
//       }
//     }
//   }else{
//     next()
//   }
  
// })

export default router