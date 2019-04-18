
const allUrl = {
    getInfo:'/v1/api/user/regist_info', //获取注册信息
    getCourseInfo:'/v1/api/tea/course_info', //老师课程设置获取
    submitCourse:'/v1/api/stu/course_info/submit', //课程设置提交
    courseHistory:'/v1/api/comm/course/batchhist/list', //获取历史课程批次
    uploadfile:'/v1/api/comm/uploadfile', //上传头像
    upload:'/v1/api/comm/upload', //上传附件
    uploadPic:'/v1/api/comm/just/uploadfile',
    registInfo:'/v1/api/user/regist_info',//获取信息去注册
    regist:'/v1/api/user/regist',//注册
    login:'/v1/api/user/login',//登陆
    logout:'/v1/api/user/logout', //退出
    find:'/v1/api/user/pswd/find',//登陆
    batch:'/v1/api/course/batch',//批次（学生）
    curstep:'/v1/api/comm/menu/curstep', // 学生/老师-获取环节节点标记
    nextStep:'/v1/api/tea/nextstep',//下一环节（老师）
    course_m_info:'/v1/api/comm/course_m_info',//批次（学生）
    course_list:'/v1/api/course/list',//获取题型(学生)
    courseSubmit:'/v1/api/course/submit', //提交答案
    onlineTest:'/v1/api/comm/scorereport/onlineTest',//在线测试成绩单
    findPyramid:'/v1/api/stu/group/list', //寻找棱锥
    gsAnalysis:'/v1/api/stu/gs/analysis', //公司解析
    uploadList:'/v1/api/comm/group/list/video', //上传列表
    lookSingPic:'/v1/api/comm/group/list/look', //寻找棱锥查看单个图片
    listLike:'/v1/api/comm/group/list/like', //点赞
    groupCondition:'/v1/api/tea/group/repart/condition', //获取分组条件
    getAssignTeam:'/v1/api/tea/group/repart', //获取分配小组
    courseList:'/v1/api/comm/uploadlist', //获取上传课件的列表
    subConfirm:'/v1/api/tea/group/repartDiscuss/confirm',//老师提交小组分配
    userList:'/v1/api/tea/task/userlist', //老师分组 获取组员
    taskSubmit:'/v1/api/tea/task/repart', //分组完成
    courseSummary:'/v1/api/comm/work/result', //学生/老师-作业分享
    homeComment:'/v1/api/comm/works/comment/submit', //作业评论
    workShare:'/v1/api/stu/works/share', //作业分享提交
    classTest:'/v1/api/tea/scorereport/classTest', //课堂总结(老师)
    stuClassTest:'/v1/api/stu/scorereport/classTest', //课堂总结(学生)
    deleteUploadfile:'/v1/api/tea/uploadfile/delete', //删除附件
    afterClassTest:'/v1/api/tea/scorereport/afterclassTest', //老师课后实验
    checkSum:'/v1/api/tea/scorereport/checksum', //老师-检测数据统计-表面积、体积
    studetail:'/v1/api/course/list/user', //老师端查看学生的答题情况
    ctotal:'/v1/api/tea/scorereport/ctype', //老师-成绩单-检测数据统计
    totaldetail:'/v1/api/tea/scorereport/ctype/detail' //老师-成绩单-检测数据统计
}
export default {
    allUrl
}