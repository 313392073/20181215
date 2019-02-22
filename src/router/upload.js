var demo_h5_upload_ops = {
    init:function(){
        this.eventBind();
    },
    eventBind:function(){
        var that = this;
        $('#upload').change(function() {
            var reader = new FileReader();
            reader.onload = function(e){
                that.compress(this.result);
            }
            reader.readAsDataURL(this.files[0]);
        })
    },
    compress:function(res) {
        var that = this;
        var img = new Image();
        var maxH = 300;

        img.onload = function(){
            var cvs = document.createElement('canvas');
            ctx = cvs.getContext('2d');
            if(img.height > maxH) {
                img.width *= maxH/img.height;
                img.height = maxH;
            }
            cvs.width = img.width;
            cvs.height = img.height;

            ctx.clearRect(0,0,cvs.width,cvs.height);
            var dataUrl = cvs.toDataURL('image/jpge',1);

            $(".img_wrap").attr('src',dataUrl);
            $(".img_wrap").show();
            
            that.upload( dataUrl );
        }
    },
    upload:function(image_data) {

    }
}

$(document).ready(function() {
    demo_h5_upload_ops.init()
})


var upload = document.getElementById('upload');
var preview = document.getElementById('preview');
var surebtn = document.getElementById('surebtn');
var imgurl = '';

upload.addEventListener('change',handleFile,false);
surebtn.addEventListener('click',uploadFile,false);

function handleFile(){
    window.URL = window.URL || window.webkitURL;
    var sUserrAgent = navigator.userAgent.toLowerCase();
    var selected_file = upload.files[0];

    if(sUserrAgent.match(/android/i) == 'android') {
        var img = new Image();
        img.src = window.URL.createObjectURL(selected_file);
        preview.innerHTML = '';
        preview.appendChild(img);

        var reader = new FileReader();
        reader.oonload = function(e) {
            imgurl = e.target.result;
        }
        reader.readAsDataURL(selected_file);
    }else{
        var imageType = /image.*/;

        if(!selected_file.type.match(imageType)) {
            return false;
        }

        var img = document.createElement('img');
        img.files = selected_file;
        preview.innerHTML = '';
        preview.appendChild(img);
        img.onload = function(){
            imgurl = img.src;
        }
        var reader = new FileReader();
        reader.onload = function(e){
            img.src = e.target.result;
        }
        reader.readAsDataURL(selected_file)
    }
}

function uploadFile(){
    var start = imgurl.indexOf(',')+1;
    dataUrl = imgurl.substr(start);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('post','todo.php',true);
    xmlhttp.setRequestHeader('Content-Type','appliaction/x-www-form-urllencoded',)
}

var u = navigator.userAgent;
var app = navigator.appVersion;
//android终端 或者uc浏览器
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
//ios终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

if(isAndroid) {
    //如果是安卓手机  就弹框是选择图片还是拍照
    $(".tankuang").css('display','block');
}else{
    //如果是苹果系统  就还拍照之前的样子去操作即可
    $("#pictueA_file")[0].click()
}


window.onload = function() {
    document.getElementById('id-face').addEventListener('change',function() {
        this.onFileChange(this,'face-result','face-empty-result')
    })
    document.getElementById('id-back').addEventListener('change',function() {
        onFileChange(this,'back-result','back-empty-result');
    })
    document.getElementsByClassName('btn')[0].addEventListener("click",function() {
        submit();
    })
}

/**
 * 选中图片时的处理
 * @param {*} fileObj  input file 元素
 * @param {*} el 选中后用于显示图片的元素ID
 * @param {*} btnel 未选中图片时显示的按钮区域ID
 */


 function onFileChange(fileObj,el,btnel) {
     var windowURL = window.URL || window.webkitURL;
     var dataUrl;
     var imgObj = document.getElementById(el);
     document.getElementById(btnel).style,display = 'none';
     imgObj.style.display = 'block';
     if(fileObj && fileObj.files && fileObj.files[0]) {
         dataUrl = windowURL.createObjectURL(fileObj.files[0])
     }
 }
