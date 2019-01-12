const stumenu = {
    beforetab : [
        {name:'在线测试',url:'/stuonlinetest'},
        {name:'寻找棱锥',url:'/stuassigngroupcase'},
        {name:'制作棱锥',url:'/stumakepyramids'}
    ],
    lessontab:[
        {
           name:'作业分享',
           url:'/stuhomeworkshare',
        },
        {
           name:'正棱锥表面积',
           tag:true,
           list:[
              {name:'视频分享',target:'/stuvideoshare'},
               {name:'侧面积公式',target:'/stusideareaformula' },
               {name:'表面积公式',target:'/sturegularareaformula' }
           ]
       },
       {
           name:'正棱锥体积',
           tag:true,
           list:[
              {name:'课后习题',target:'/stuvolumeformula' },
               {name:'线线关系',target:'/stuexpregpyramid' },
           ]
       },
       {
            name:'课堂总结',
            url:'/stulearningreport',
        },
    ],
    aftertab: [
        {name:'课后习题',url:'/stuexercise'},
        {name:'课后实验',url:'/stuaftclaexp'}
    ]
}

const teamenu = {
    beforetab:[
        {name:'在线测试',url:'/teapracticreport'},
        {name:'寻找棱锥',url:'/tealookingforpyramid'},
        {name:'制作棱锥',url:'/teamakepyramid'}
    ],
    lessontab:[
        {
            name:'作业分享',
            url:'/teahomeworkshare',
         },
         {
            name:'正棱锥表面积',
            tag:true,
            list:[
               {name:'视频分享',target:'/teavideoshared'},
                {name:'表面积公式',target:'/teacalsurfacearea' },
                {name:'计算表面积',target:'/tearegularpyramidtotal' },
            ]
        },
        {
            name:'正棱锥体积',
            tag:true,
            list:[
               {name:'正棱锥表面积检测',target:'/tearegchecktotal' },
                {name:'计算体积统计',target:'/tearegularvolumetotal' },
            ]
        },
        {
            name:'课堂总结',
            url:'/teaclasstotalresult',
         },
    ],
    aftertab:[
        {name:'课后习题',url:'/teapraafterclass'},
        {name:'课后实验成绩统计',url:'/teaafterexptotal'}
    ]
}

export default{ stumenu,teamenu }