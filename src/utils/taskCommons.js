
//上传照片到服务器

export function uploadImg(vm,taskid,imgname,imgurl,type,sobj){
    //中转服务器地址
    var fileUploadUrl = "https://cloud.yunpuhuaxing.com/xgjUser.fileUpload2.do" ; 
    var _this = vm ; 
    //检索数据
    //检索数据
				var index = _this.imgs.findIndex(img => {
						if(img.name == imgname){
							return true ;
						}
					});
				if(_this.imgs[index].uploadRuning == true){
					return ;
				}
            _this.imgs[index].uploadRuning = true ; 

    var task = plus.uploader.createUpload(fileUploadUrl, 
        { method:"POST",blocksize:204800,priority:100 },
        function (t, status ) { 
            // 上传完成
            if ( status == 200 ) { 
                console.log("上传到中转服务器成功。"+t.responseText) ;
                //upload.responseText, 服务器返回的数据，这儿返回的是图片在服务器的地址
                let serverImgUrl = t.responseText ; 
                console.log("上传的照片的服务器地址："+t.responseText) ;  
                _this.$request_SF({
                    method:"POST",
                    url:"/PlatformAddTaskPhoto/upload",
                    params:{
                        taskid:taskid,
                        imgurl:serverImgUrl,
                        type:type,
                        sobj:sobj,
                    },
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("accessToken")
                    }
                },res => {
                    if(res.data == true){
                        _this.$notify({
                            title: '上传提示',
                            message: '上传到SF成功',
                            duration:1500,
                            type: 'success'
                        }); 
                        _this.imgs[index].uploaded = true ;
                    }else{
                        _this.$notify({
                            title: '上传提示',
                            message: '上传到SF失败，请重试或联系管理员。',
                            duration:1500,
                            type: 'warning'
                        }); 
                        _this.imgs[index].uploaded = false ;  
                    }
                },err => {   
                    _this.$notify({
                        title: '上传提示',
                        message: '上传到SF程序出错，请立即联系管理员。',
                        duration:1500,
                        type: 'error'
                    }); 
                    _this.imgs[index].uploaded = false ;  
                })  ; 


            } else {
                _this.imgs[index].uploadRuning = false ; 
                _this.$notify({
                    title: '上传提示',
                    message: '上传到服务器失败，请联系管理员。',
                    duration:1500,
                    type: 'error'
                }); 
            }
        }
    );

    task.addFile(imgurl, {key:"testdoc",name:imgname} );
	task.start();
}


//从相册选择照片
export function choiceImg(vm){
    var _this = vm ; 
    
    var now = new Date() ; 
    var dateformat = ""+now.getFullYear()+(now.getMonth()+1)+now.getDate()+now.getHours()+now.getMinutes()+now.getSeconds() ;
    plus.gallery.pick( function(path){
            //选择照片成功的回调，返回照片地址
            console.log("选择的系统相册的照片路径："+path);
            //压缩照片
            compressImage(_this,path,dateformat+".jpg","equ") ; 

        }, function ( e ) {
            //选择照片失败的回调
            console.log("你已经取消了选择照片") ; 
        },{
            //设置照片参数
            filename:"_doc/camera/EQU_"+dateformat+".jpg", //自定义照片名称,如_doc/a.jpg，也可以是路径如_doc/aaa/
            filter:"image"
         }

    );
}


//手机拍照方法
export function capture(vm,type){
    var _this = vm ; 
    // 获取设备默认的摄像头对象 
    var cmr = plus.camera.getCamera();
    var res = cmr.supportedImageResolutions[0]; //字符串数组，摄像头支持的拍照分辨率
    var fmt = cmr.supportedImageFormats[0];  //字符串数组，摄像头支持的拍照文件格式
    var now = new Date() ; 
    var dateformat = ""+now.getFullYear()+(now.getMonth()+1)+now.getDate()+now.getHours()+now.getMinutes()+now.getSeconds() ; 
    console.log("Resolution: "+res+", Format: "+fmt); //输出： Resolution: 3648*2736,Format: jpg
    cmr.captureImage( 
        function( path ){
            console.log("文件路径："+path); 
            plus.io.resolveLocalFileSystemURL(
                path, //照片的本地地址
                function(entry) { //SuccessCB
                    let printmsg = "name："+entry.name+",fullPath："+entry.fullPath+",toLocalURL："+entry.toLocalURL()+"toRemoteURL："+entry.toRemoteURL() ;
                    console.log(printmsg) ;
                    compressImage(_this,entry.toLocalURL(),entry.name,type) ; 
                    //_this.imgs.push({'url':entry.toLocalURL(),'name':entry.name,'type':type,'uploaded':false,'uploadPercent':0,'uploadRuning':false}) ; 
                }, 
                function (e) {  //ErrorCB
                    alert( "Resolve file URL failed: " + e.message );
                }
            );  
             
        },
        function( error ) {
        },
        {
            //摄像头拍照参数（必须）
            filename:type == "equ" ? "_doc/camera/EQU_"+dateformat+".jpg" : "_doc/camera/Invoice_"+dateformat+".jpg", //自定义照片名称,如_doc/a.jpg，也可以是路径如_doc/aaa/
            format:fmt,
            index:1,
            resolution:"400*800"  //拍照分辨率
        }
    );
}

//照片压缩方法,并将照片显示到页面中
function compressImage(vm,url,filename,type){  
    var _this = vm ; 
    var name="_doc/camera/compress/"+filename;//_doc/camera/compress/1467602809090.jpg 
    console.log("filename："+filename) ; 
        plus.zip.compressImage(
            {  
                src:url,        //src: (String 类型 )压缩转换原始图片的路径  
                dst:name,       //压缩转换目标图片的路径  
                quality:50,     //压缩图片的质量1-100 图片质量从小到大
                overwrite:true  //overwrite: (Boolean 类型 )覆盖生成新文件  
            },  
            function(event) {   
                //照片回显
                console.log("url；"+event.target) ;  
                _this.imgs.push({'url':event.target,'name':filename,'type':type,'uploaded':false,'uploadPercent':0,'uploadRuning':false}) ; 
                
            },function(error) {   
                console.log("压缩照片失败,以原图进行回显") ; 
                _this.imgs.push({'url':url,'name':filename,'type':type,'uploaded':false,'uploadPercent':0,'uploadRuning':false}) ; 
            }
        );  
}
