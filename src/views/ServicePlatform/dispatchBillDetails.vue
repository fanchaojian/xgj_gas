<!--
	Authro:凡朝剑
	Date:20200522
	Function:送货任务详情页
	Details:
		1.送货任务详情
		2.任务签到
		3.当前地理位置定位
		4.手机拍照上传照片
		5.任务签退
-->
<template>
    <div id="pollingDetails" name="pollingDetails" style="width:100%; height:100%; background-color:white;">
       <!--头部区域-->
		<my-header pageName="通气任务详情" doSearch="false"  :backPath="back" />

		<div class="container-fluid" style="padding-top:50px;">
			<!--基本信息-->
			<div class="col-xs-12 item">
				<div class="col-xs-2">名称：</div>
				<div class="col-xs-10">{{dispatchBill.Name}} </div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">编号：</div>
				<div class="col-xs-10">{{dispatchBill.InvoiceNumber__c}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">客户：</div>
				<div class="col-xs-10">{{'Customer__r' in dispatchBill ? dispatchBill.Customer__r.Name : ""}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">订单：</div>
				<div class="col-xs-10">{{'OrderForm__r' in dispatchBill ? dispatchBill.OrderForm__r.Name:" "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-3">工程名称：</div>
				<div class="col-xs-9">{{dispatchBill.ProjectName__c}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-3">工程编号：</div>
				<div class="col-xs-9 ">{{dispatchBill.ProjectNumber__c}}</div>	
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-3">收货地址：</div>
				<div class="col-xs-9 ">{{dispatchBill.ShippingAddress__c}}</div>	
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-3">联系人名：</div>
				<div class="col-xs-9">{{'Contacts__r' in dispatchBill? dispatchBill.Contacts__r.Name:""}}</div>	
			</div>
            <div class="col-xs-12 item">
				<div class="col-xs-3">联系电话：</div>
				<div class="col-xs-9">{{dispatchBill.ContactWay__c}}</div>	
			</div>
            <div class="col-xs-12 item">
				<div class="col-xs-4">现场联系人：</div>
				<div class="col-xs-8">{{dispatchBill.SiteContact__c}}</div>	
			</div>
            <div class="col-xs-12 item">
				<div class="col-xs-4">通知发货日：</div>
				<div class="col-xs-8">{{dispatchBill.DeliveryDate__c}}</div>
			</div>

            <div class="col-xs-12"  style="padding-top:8px; padding-bottom:8px; border-bottom:2px solid #e0eee8 ;">
				<div class="col-xs-3">当前位置：</div>
				<div class="col-xs-9 ">
					<span v-if="! myLocation">正在定位...</span>
						{{position.formattedAddress}}
					<span v-loading="! myLocation"></span> 
					<span :class="{'finished':myLocation,'running':! myLocation,'statusBox2':true}" ></span>
				</div>	
			</div>


			<div v-if="isSign2" id="signin" class="col-xs-12 item center" style="border-bottom:0px;">
				<div class="col-xs-3"></div>
				<div class="col-xs-6">
					<span style="color:green; font-size:12px;">请务必到指定位置签到！</span>
					<button :class="{'myBtn':true,'btnRuning':! isable,'btnDefault':isable}"  @click="signin" :disabled="isable">任务签到</button>
				</div>
				<div class="col-xs-3"></div>
			</div>
			
			<!--上传照片和签退-->
            <div v-if="isSign"  id="afterSign" class="col-xs-12">
				<div class="col-xs-12">送货拍照:</div>
				<div class="col-xs-12" align="center">
					<span style="color:blue; font-size:13px;">
						你已经上传过{{'PicCount__c' in dispatchBill ? dispatchBill.PicCount__c : 0}}张照片,你至少还需上传{{('PicCount__c' in dispatchBill ? dispatchBill.PicCount__c : 0)>1 ? 0 : (1-('PicCount__c' in dispatchBill ? dispatchBill.PicCount__c : 0))}}张照片
					
					</span>
				</div>
				<div class="col-xs-12" style="border-bottom:1px solid #ddd; padding-bottom:5px;">
					<div class="col-xs-6" align="center">
						<button class="btn btn-success" type="button" @click="captureImage('equ')" style="width:60%; height:30px; border-radius:8px;">相机拍照</button>
					</div>
					<div class="col-xs-6" align="center">
						<button class="btn btn-success" type="button" @click="choicePicture()" style="width:60%; height:30px; border-radius:8px;">相册选择</button>
					</div>
				</div>
				

				<div class="col-xs-12">
					<div v-for="img in imgs" :key="img.name">
						<div class="imgbox">
						<!--防误触UI（一般）-->
							<div class="col-xs-3"><img class="uploadimg" :src="img.url"/></div>
							<div class="col-xs-6"><span style="line-height:80px;">dispatchBill.jpg</span></div>
							<div class="col-xs-1" align="center">
								<span style="line-height:80px;">
									<img @click="remove(img.name)" v-if="!img.uploaded"  style="line-height:80px;" width="20px" height="20px" src="@/assets/ServicePlatform/imgs/remove.png" />
								</span>
							</div>
							<div class="col-xs-1">
								<span style="line-height:80px;">
									<img style="line-height:80px;" v-if="img.uploaded" width="20px" height="20px" src="@/assets/ServicePlatform/imgs/success.png" />
								</span>
							</div>
							<div class="col-xs-1">
								<button  @click="upload(img.name,img.url,img.type)" 
										 v-if="!img.uploaded" 
										 :class="{'uploadbox':true,'uploadRuning':img.uploadRuning,'uploadStatic':! img.uploadRuning}" 
										 :disabled="uploadRuning" style="size:14px; font-size:14px; margin-top:30px; color:white;">
									传
								</button>
							</div>
						</div>
						<div class="cox-xs-12 imgboxline" ></div>
					</div>
				</div>
                

			    <!--签退表单-->
				
				<div class="col-xs-12 item_qt">
					任务备注
					<textarea id="remark" v-model="remark" :disabled="read"  class="form-control" rows="3" placeholder="">
					</textarea>
				</div>

				<div v-if="! isComplete" class="col-xs-12 item center" style="border-bottom:0px;">
					<div class="col-xs-3"></div>
					<div class="col-xs-6">
						<button :class="{'myBtn':true,'btnRuning':! isable,'btnDefault':isable}" @click="signout" :disabled="isable">任务签退</button>
					</div>
					<div class="col-xs-3"></div>
				</div>

			</div>

		</div>
    </div>

</template>


<script> 
import MyHeader from '@/components/ServicePlatform/Header.vue';
import {capture,choiceImg,uploadImg} from '@/utils/taskCommons.js'

export default {
    name:"pollingDetails",
    data(){
        return {
			taskid:this.$store.state.dispatchBillData.dispatchBill.Id, 
            dispatchBill:this.$store.state.dispatchBillData.dispatchBill ,
			imgs:[],  //{'url':_照片地址,'name':_照片名称,'type':_拍照类型(设备、巡检单),'uploaded':_是否上传,'uploadPercent':0,'uploadRuning':_是否正在上传}
			accessToken:localStorage.getItem("accessToken"),  //从内存中获取token
			remark:"",		//备注
			isSign:this.$store.state.dispatchBillData.dispatchBill.SignState__c == '已签到' ? true : false ,  //已签到图标显示
            isSign2:this.$store.state.dispatchBillData.dispatchBill.SignState__c == '已签到' ? false : true ,  //未签到图标显示
			isComplete:false,	//签退按钮隐藏
			read:false,		//控制输入框“只读”状态
			isable:false,	//控制按钮“无法操作”状态，在请求数据期间禁止重复键入
			
			//定位
           	position:{
              	lnglat:"",  //位置经纬度
              	lng:"",
              	lat:"",
              	position:new AMap.LngLat("",""),
              	location_type:"",  //定位类型
              	formattedAddress:"",  //解析的当前位置
              	info:"",
           	},
			myLocation:false , //是否定位成功
			back:{
				path:"/dispatchBill",
				name:"dispatchBill",
				params:{
					'keywords':this.$store.state.dispatchBillData.keywords ,
				}
			}
        } ; 
    },
	components:{
		MyHeader
	},
    methods:{
		//从相册选择照片
		choicePicture(){
			choiceImg(this) ;
		},
		//手机拍照
		captureImage(type){
			capture(this,type) ;
		},
		//移除照片
		remove(name){
			console.log(name) ; 
			var index = this.imgs.findIndex(img => {
				if(img.name == name){
				return true ;
				}
			});

			this.imgs.splice(index,1) ;
		},

		//上传照片到服务器
		upload(imgname,imgurl,type){
			uploadImg(this,this.taskid,imgname,imgurl,type,'DispatchBill') ; 
		},
		
		//签到方法
        signin(){
			let _this = this ; 
			_this.isSignin = true ; 
			//如果定位成功，执行签到逻辑
			if(_this.position.info == "SUCCESS"){
				_this.isable = true; 

				_this.$request_SF({
					method:"POST",
					url:"/PlatformDispatchBillSigninRest/doSignin",
					params:{
						taskid:_this.taskid,
						lnglat:_this.position.lnglat 
					},
					headers:{
						Authorization:"Bearer "+this.accessToken
					}
				},res=>{
					if(res.data == 'true'){
						_this.$notify({
							title: '签到提示',
							message: '签到成功，稍后请上传照片后签退。',
							duration:1500,
							type: 'success'
						}); 
						_this.isSign = true ; 
						_this.isSign2 = false ; 
						_this.isable = false ; 
					}else{
						_this.$notify({
							title: '签到提示',
							message: '签到失败，请重试或联系管理员。',
							duration:1500,
							type: 'warning'
						}); 
						_this.isable = false ;
					}
				},err=>{
					_this.$notify({
						title: '签到提示',
						message: '签到程序发生错误，请联系管理员。',
						duration:1500,
						type: 'error'
					}); 
					_this.isable = false ;
				}) ; 

			
			}else{
				_this.$notify({
					title: '',
					message: '正在定位，请稍后。',
					duration:1500,
					type: 'info'
				}); 
			}
			
        },
		//签退方法
		signout(){
			let _this = this ; 
			
			var count = 0 ; 
			
			for(var i=0; i<_this.imgs.length;i++){
				if(_this.imgs[i].uploaded == true){
					count = count + 1 ; 
				}
			}
			var imgcount = count + ('PicCount__c' in _this.dispatchBill ? _this.dispatchBill.PicCount__c : 0 ) ; 

			//上传照片的数量不少于1张（20200611更改需求）
			if(imgcount >= 1){ 
				_this.read = true; 		//input 只读状态
				_this.isable = true;   //按钮 “不可操作” 状态

				_this.$request_SF({
					method:"POST",
					url:"/PlatformDispatchBillSignoutRest/doSignout",
					params:{
						taskid:_this.taskid,  
						remark:_this.remark ,  //备注
					},
					headers:{
						Authorization:"Bearer "+this.accessToken
					}
				},res=>{
					if(res.data == 'true'){
						_this.$notify({
							title: '签退提示',
							message: '签退成功',
							duration:1500,
							type: 'success'
						}); 
						_this.isComplete = true ;	//签退 按钮隐藏
						_this.isable = false ; 		//按钮 “可操作” 状态

						//签退成功，返回到列表页面
						_this.$router.push('/dispatchBill')
					}else{
						_this.$notify({
							title: '签退提示',
							message: '签退失败，请重试或联系管理员。',
							duration:1500,
							type: 'warning'
						}); 
						_this.isable = false ; 
					}
				},err=>{
					_this.isable = false ; 
				}) ; 


			}else{
				_this.$notify({
					title: '',
					message: '请至少上传1张照片',
					duration:1500,
					type: 'warning'
				}); 
			}
			
		},
		//数据加载完成后调用，获取当前位置
		getPosition(){
			var _this = this ; 
			AMap.plugin('AMap.Geolocation', function() {
				var geolocation = new AMap.Geolocation({
					// 是否使用高精度定位，默认：true
					enableHighAccuracy: true,
					// 设置定位超时时间，默认：无穷大
					timeout: 10000,
					//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					zoomToAccuracy: true,     
				})
				geolocation.getCurrentPosition()
				AMap.event.addListener(geolocation, 'complete', onComplete)
				AMap.event.addListener(geolocation, 'error', onError)

				function onComplete (data) {
					_this.position.lnglat = data.position.lng+','+data.position.lat ;
					_this.position.lng = data.position.lng ;
					_this.position.lat = data.position.lat ;
					_this.position.position = data.position ; 
					_this.position.location_type = data.location_type ; 
					_this.position.formattedAddress = data.formattedAddress ; 
					_this.position.info = data.info ;

					_this.myLocation = true ; 
					
				}

				function onError (data) {
					_this.$notify({
						title: '',
						message: "获取位置失败，正在重试。。。。",
						duration:1500,
						type: 'info'
					}); 
					_this.getPosition() ;  //重新定位
				}
			}) ;
		},
    },
	mounted(){
        this.getPosition() ; 
	},

}; 
</script>


<style lang="scss" scoped>
	.page-loadmore {
		width: 100%;
		height: 100%;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
	}
    * {
		margin:0 ; 
		padding:0 ; 
	}
	.container-fluid {
		padding-right:15px;
		padding-left:15px;
	}
	.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12  {
		padding-left:0px;
		padding-right:0px;
	}
	
	.ds {
		font-size:12px ; 
	}
	.lineShadow {
		margin:0 ; 
		padding:0 ; 
		box-shadow: 0px 1px 4px black;
	}
	.topBg {
		background:#e0eee8;
	}
	.el {
		padding-left:15px ; 
		padding-right:15px;
	}

	.statusBox {
		width:14px; height:14px;  display:inline-block; border-radius:50%; margin-left:18px;
	}
	.statusBox2 {
		width:14px; height:14px; display:inline-block; border-radius:50%; margin-left:13px;;
	}
	
	.item {
		padding-top:8px;
		padding-bottom:8px;
		border-bottom:1px solid #dddddd ;
	}
	.item_qt {
		padding-top:8px;
		padding-bottom:8px;
	}

	.myBtn {
		width:100%; height:100%; line-height:30px; border-radius:5px; 
	}
	
	.btnRuning {
		 background-color:#99CCFF;  //还未签到时的状态
	}
	.btnDefault {
		 background-color:#dddddd;  //签到后的状态
	}
	
	.center {
		text-align:center ; 
	}

    .finished {
        background-color:green ; 
    }
    
    .running {
        background-color:orange ; 
    }

	/**手机拍照样式表**/
	.imgbox {
		width:100%; 
		height:80px; 
	}
	.uploadimg {
		width:70px;
		height:70px;
		margin:5px;
		border-radius:5px;
	}
	
	.iconbox {
		width:26px; height:26px; padding-top:3px;
	}
	.delimgbox {
		height:20px; width:20px; border-radius:50%; border:1px solid #ccc;
	}
	.uploadbox {
		height:20px; width:20px;  color:black;  border-radius:50%;  border:1px solid #ccc;
	}
	.uploadRuning {
		border:1px solid #ccc;
		background-color:#ccc;
	}
	.uploadStatic {
		border:1px solid green;
		background-color:green;
	}
	.imgboxline {
		width:100%; height:1px; border-bottom:1px solid #ddd;
	}
	/**========================**/

	.form-control[disabled] {
		//background-color:#e0eee8 ;
		background-color:white ;
	}
	.el-icon-document:before {
    content: "";
}

.el-upload-list--picture .el-upload-list__item  {
   height:60px;
   padding:4px 5px 5px 90px ;
}

.el-upload-list--picture .el-upload-list__item-name {
   margin-top:12px;
}

.el-upload-list--picture .el-upload-list__item-thumbnail {
   height:50px;
}

</style>