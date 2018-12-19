// plus.screen.lockOrientation("landscape-primary"); // 把屏幕方向改变成横屏正方向
// plus.screen.unlockOrientation(); // 取消旋转屏幕 
// console.log(plus)
// //右边tab 
// $(".tab-btn").on("click",function(){
//     var self = $(this);
//     var tag = $(this).siblings(".secondary").css('display');
//     if(tag == 'none'){
//         $(this).siblings(".secondary").slideDown(200,function(){
//             $(self).find('.iconfont').removeClass('icon-sanjiaoxing1');
//             $(self).find('.iconfont').addClass('icon-sanjiaoxing');
//         });
//     }else{
//         $(this).siblings(".secondary").slideUp(200,function(){
//             $(self).find('.iconfont').removeClass('icon-sanjiaoxing');
//             $(self).find('.iconfont').addClass('icon-sanjiaoxing1');
//         });
//     }
// })

// $(".before-class>li").on("click",function(){
//     $(this).addClass('active').siblings("li").removeClass('active')
// })


//校验密码
const checkStrong = function (value) {
    var strength = 0;
    if (value.length > 5 && value.match(/[\da-zA-Z]+/)) {
        if (value.match(/\d+/)) {
            strength++;
        }
        if (value.match(/[a-z]+/)) {
            strength++;
        }
        if (value.match(/[A-Z]+/)) {
            strength++;
        }
    }
    if (strength >= 3) {
        return true;
    }
    return false;
}

export default {
    checkStrong:checkStrong
}

