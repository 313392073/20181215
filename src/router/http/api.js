
const allUrl = {
    uploadfile:'/v1/api/comm/uploadfile', //上传头像
    upload:'/v1/api/comm/upload', //上传附件
    registInfo:'/v1/api/user/regist_info',//获取信息去注册
    regist:'/v1/api/user/regist',//注册
    login:'/v1/api/user/login',//登陆
    find:'/v1/api/user/pswd/find',//登陆
    batch:'/v1/api/course/batch',//批次（学生）
    course_m_info:'/v1/api/comm/course_m_info',//批次（学生）
    course_list:'/v1/api/course/list',//获取题型(学生)
    courseSubmit:'/v1/api/course/submit', //提交答案
    onlineTest:'/v1/api/comm/scorereport/onlineTest',//在线测试成绩单
    findPyramid:'/v1/api/stu/group/list', //寻找棱锥
    uploadList:'/v1/api/stu/group/list/video', //上传列表
    lookSingPic:'/v1/api/comm/group/list/look', //寻找棱锥查看单个图片
    groupCondition:'/v1/api/tea/group/repart/condition', //获取分组条件
    getAssignTeam:'/v1/api/tea/group/repart', //获取分配小组
    courseList:'/v1/api/comm/uploadlist' //获取上传课件的列表
    
    
}
export default {
    allUrl
}