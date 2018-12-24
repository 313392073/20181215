routes:[
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
        path: '/courseset',
        name: 'CourseSet',
        component: CourseSet,
        meta:{
          title:'课后安排设置',
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
      { //老师 start
        path: '/teapracticreport',
        name: 'PracticReport',
        component: PracticReport,
        meta:{
          title:'在线测试(学生)',
          auth:true
        }
      },
      {
        path: '/tealookingforpyramid',
        name: 'LookingForPyramid',
        component: LookingForPyramid,
        meta:{
          title:'寻找棱锥',
          auth:true
        }
      },
      {
        path:'/teamakepyramid', 
        name:'MakePyramid',
        component:MakePyramid,
        meta:{
          title:'制作棱锥',
          auth:true
        }
      },
      {
        path: '/teahomeworkshare',
        name: 'HomeworkShare',
        component: HomeworkShare,
        meta:{
          title:'作业分享',
          auth:true
        }
      },
      {
        path: '/teasharedetail',
        name: 'ShareDetail',
        component: ShareDetail,
        meta:{
          title:'作业分享2',
          auth:true
        }
      },
      {
        path: '/teavideoshared',
        name: 'VideoShared',
        component: VideoShared,
        meta:{
          title:'视频分享',
          auth:true
        }
      },
      {
        path:'/teavidedetail', 
        name:'VideDetail',
        component:VideDetail,
        meta:{
          title:'视频详情',
          auth:true
        }
      },
      {
        path: '/teacalsurfacearea',
        name: 'CalSurfaceArea',
        component: CalSurfaceArea,
        meta:{
          title:'表面积公式',
          auth:true
        }
      },
      {
        path: '/tearegularpyramidtotal',
        name: 'RegularPyramidTotal',
        component: RegularPyramidTotal,
        meta:{
          title:'计算表面积',
          auth:true
        }
      },
      {
        path: '/tearegchecktotal',
        name: 'RegCheckTotal',
        component: RegCheckTotal,
        meta:{
          title:'正棱锥表面积检测数据统计',
          auth:true
        }
      },
      {
        path:'/tearegularareaformula', 
        name:'RegularAreaFormula',
        component:RegularAreaFormula,
        meta:{
          title:'计算表面积',
          auth:true
        }
      },
      {
        path:'/tearegularvolume', 
        name:'RegularVolume',
        component:RegularVolume,
        meta:{
          title:'计算体积',
          auth:true
        }
      },
      {
        path:'/tearegularvolumetotal', 
        name:'RegularVolumeTotal',
        component:RegularVolumeTotal,
        meta:{
          title:' 计算体积统计',
          auth:true
        }
      },
      {
        path: '/teaclasstotalresult',
        name: 'ClassTotalResult',
        component: ClassTotalResult,
        meta:{
          title:'课堂总结',
          auth:true
        }
      },
      {
        path:'/teapraafterclass', 
        name:'PraafterClass',
        component:PraafterClass,
        meta:{
          title:'课后习题',
          auth:true
        }
      },
      {
        path:'/teacoursemanagement', 
        name:'CourseManagement',
        component:CourseManagement,
        meta:{
          title:'课后习题(课件管理)',
          auth:true
        }
      },
      {
        path: '/teaafterexptotal',
        name: 'AfterExpTotal',
        component: AfterExpTotal,
        meta:{
          title:'课后实验成绩统计',
          auth:true
        }
      }, //老师end 
      { //学生start
        path: '/stuonlinetest',
        name: 'OnlineTest',
        component: OnlineTest,
        meta:{
          title:'在线测试',
          auth:true
        }
      },
      {
        path:'/stutestreport', 
        name:'TestReport',
        component:TestReport,
        meta:{
          title:'课堂学习成绩报告(学生)',
          auth:true
        }
      },
      {
        path: '/stuassigngroupcase',
        name: 'AssignGroupCase',
        component: AssignGroupCase,
        meta:{
          title:'寻找棱锥（学生）',
          auth:true
        }
      },
      {
        path:'/stuuploadpic', 
        name:'UploadPic',
        component:UploadPic,
        meta:{
          title:'上传图片（寻找棱锥）',
          auth:true
        }
      },
      { 
        path: '/stuuploadpicList',
        name: 'UploadPicList',
        component: UploadPicList,
        meta:{
          title:'图片上传列表',
          auth:true
        }
      },
      {
        path:'/stupicdetail', 
        name:'PicDetail',
        component:PicDetail,
        meta:{
          title:'图片详情'
        }
      },
      {
        path:'/stumakepyramids', 
        name:'MakePyramids',
        component:MakePyramids,
        meta:{
          title:'制作棱锥',
          auth:true
        }
      },
      {
        path: '/stujobresults',
        name: 'JobResults',
        component: JobResults,
        meta:{
          title:'制作棱锥（作业结果）',
          auth:true
        }
      },
      {
        path:'/stuhomeworkshare', 
        name:'StuHomeworkShare',
        component:StuHomeworkShare,
        meta:{
          title:'作业分享学生'
        }
      },
      {
        path:'/stusharedetail', 
        name:'StuShareDetail',
        component:StuShareDetail,
        meta:{
          title:'作业分享详情'
        }
      },
      {
        path: '/stuvideoshared',
        name: 'VideoShared',
        component: VideoShared,
        meta:{
          title:'视频分享',
          auth:true
        }
      },
      {
        path:'/stusideareaformula', 
        name:'SideAreaFormula',
        component:SideAreaFormula,
        meta:{
          title:'正棱锥侧面积',
          auth:true
        }
      },
      {
        path:'/sturegularareaformula', 
        name:'RegularAreaFormula',
        component:RegularAreaFormula,
        meta:{
          title:'正棱锥表面积',
          auth:true
        }
      },
      {
        path:'/stuvolumeformula', 
        name:'VolumeFormula',
        component:VolumeFormula,
        meta:{
          title:'课后习题',
          auth:true
        }
      },
      {
        path: '/stuexpregpyramid',
        name: 'ExpregPyramid',
        component: ExpregPyramid,
        meta:{
            title:'线线关系',
            auth:true
          }
      },
      {
        path:'/stulearningreport', 
        name:'LearningReport',
        component:LearningReport,
        meta:{
          title:'课堂总结(学生)',
          auth:true
        }
      },
      {
        path:'/stuclasslearning', 
        name:'ClassLearning',
        component:ClassLearning,
        meta:{
          title:'课堂总结(课堂学习)',
          auth:true
        }
      },
      { 
        path: '/stuexercise',
        name: 'Exercise',
        component: Exercise,
        meta:{
          title:'课后习题',
          auth:true
        }
      },
      {
        path:'/stuaftclaexp', 
        name:'AftClaExp',
        component:AftClaExp,
        meta:{
          title:'课后实验',
          auth:true
        }
      },
      
]