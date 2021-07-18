<!--
	Authro:凡朝剑
	Date:20200522
	Function:维修任务详情页
	Details:
		1.维修任务详情
		2.任务签到
		3.当前地理位置
		4.手机拍照上传照片
		5.任务签退
-->
<template>
    <div id="repairDetails" name="repairDetails" style="width:100%; height:100%; background-color:white;">
       <!--头部区域-->
		<my-header pageName="维修任务详情" doSearch="false"  :backPath="back" />

		<div class="container-fluid el" style="padding-top:50px;">
			<!--基本信息-->
			<div class="col-xs-12 item">
				<div class="col-xs-2">任务：</div>
				<div class="col-xs-10">{{repair.Name}}</div>
			</div>
            <div class="col-xs-12 item">
				<div class="col-xs-2">类型：</div>
				<div class="col-xs-10">{{repair.RepairSubType__c}}</div>
			</div>
            <div class="col-xs-12 item">
				<div class="col-xs-2">配额：</div>
				<div class="col-xs-10">{{repair.Quota__c}} T</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">设备：</div>
				<div class="col-xs-10">{{'Equipment__r' in repair ? repair.Equipment__r.Name : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">名称：</div>
				<div class="col-xs-10">{{'Equipment__r' in repair ? repair.Equipment__r.DeviceName__c : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">里程：</div>
				<div class="col-xs-10">{{repair.Mileage__c}}  （公里数）</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">地址：</div>
				<div class="col-xs-10">{{repair.ActualLocation__c}}</div>
			</div>
			
            <div class="col-xs-12 item">
				<div class="col-xs-2">坐标：</div>
				<div class="col-xs-10">{{'Equipment__r' in repair ? repair.Equipment__r.LongitudeAndLatitude__c : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">签到：</div>
				<div class="col-xs-10 "><span>{{signstatus}}</span><span :class="{'finished':isSign,'running':isSign2,'statusBox':true}" ></span></div>	
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">
					定位：
					<div style="padding-left:5px;"><img @click="refreshLocation" width="25px" height="25px" src="@/assets/ServicePlatform/imgs/refresh.png" /></div>
				</div>
				<div class="col-xs-10 ">
					<span v-if="! myLocation">正在定位...</span>
						{{position.formattedAddress}} <br /> 经纬度：{{position.lnglat}} <br /> 定位法：{{position.location_type}}定位<br />
						距离：{{parseInt(dist)}}
					<span v-loading="! myLocation"></span> 
					<span :class="{'finished':myLocation,'running':! myLocation,'statusBox2':true}" ></span>
				</div>	
			</div>
			<div class="col-xs-12 item">	
				<span>联系人名：</span>
				<span>{{$store.state.repairData.repair.OnSiteContactName__c}}</span>
			</div>
			<div class="col-xs-12" style="padding-top:8px; padding-bottom:8px; border-bottom:2px solid #e0eee8 ;">	
				<span>联系电话：</span>
				<span>{{$store.state.repairData.repair.OnSiteContactTel__c}}</span>
			</div>

			<div v-if="isSign2" id="signin" class="col-xs-12 item center" style="border-bottom:0px;">
				<div class="col-xs-3"></div>
				<div class="col-xs-6">
					<span style="color:green; font-size:12px;">请务必到指定位置签到！</span>
					<button :class="{'myBtn':true,'btnRuning':! isable,'btnDefault':isable}"  @click="signin" :disabled="isable">任务签到</button>
				</div>
				<div class="col-xs-3"></div>
			</div>
			
			<!-- 上传照片和签退，至少上传5张照片 -->
            <div v-if="isSign" id="afterSign" class="col-xs-12 item">
				<div class="col-xs-12">维修拍照:</div>
				<div class="col-xs-12" align="center">
					<span style="color:blue; font-size:13px;">
						你已经上传过{{'PicCount__c' in repair ? repair.PicCount__c : 0}}张照片,你至少还需上传{{('PicCount__c' in repair ? repair.PicCount__c : 0)>5 ? 0 : (5-('PicCount__c' in repair ? repair.PicCount__c : 0))}}张照片
					
					</span>
				</div>
                <div class="col-xs-12" style="border-bottom:1px solid #ddd; padding-bottom:5px;">
					<div class="col-xs-6" align="center">
						<button class="btn btn-success" type="button" @click="captureImage('equ')" style="width:60%; height:30px; border-radius:8px;">设备拍照</button>
					</div>
					<!--<div class="col-xs-6" align="center">
						<button class="btn btn-success" type="button" @click="captureImage('invoice')" style="width:60%; height:30px; border-radius:8px;">巡检单拍照</button>
					</div>  -->
					<div class="col-xs-6" align="center">
						<button class="btn btn-success" type="button" @click="choicePicture()" style="width:60%; height:30px; border-radius:8px;">相册选择</button>
					</div>
				</div>
				

				<div class="col-xs-12">
					<!--===========图片显示遍历体=======-->
					<div v-for="img in imgs">
						<div class="imgbox">
							<!--防误触UI（一般）-->
							<div class="col-xs-3"><img class="uploadimg" :src="img.url"/></div>
							<div class="col-xs-6"><span style="line-height:80px;">{{img.name.indexOf('EQU')==-1?'维修单.jpg':'Equipment.jpg'}}</span></div>
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
					<!--========================================-->
				</div>

			    <!--签退表单-->
				
				<div class="col-xs-12 item">	
					<span>交通工具：</span>
					<select class="unit" id="mySelect" name="mySelect" v-model="Transportation"  style="border-radius:5px; width:100px;">
						<option value="有司机公车" selected = "selected">有司机公车</option>
						<option value="无司机公车">无司机公车</option>
						<option value="公共交通">公共交通</option>
						<option value="出租车">出租车</option>
						<option value="">--无--</option>
					</select>
				</div>
				<div class="col-xs-12 item">	
					<span>完成情况：</span>
					<select class="unit" id="mySelect" name="mySelect" v-model="RepairDone"  style="border-radius:5px; width:80px;">
						<option value="true" selected = "selected">已完成</option>
						<option value="false">未完成</option>
					</select>
				</div>

				<div class="col-xs-12">
					指标压力：<span style="font-size:12px; color:red;">（必填）</span>
				</div>
				<div class="col-xs-12 item_qt">
					<!--进口压力-->
					<div class="col-xs-3" >
						<input type="text" class="form-control input-sm" v-model="InletPressure" :disabled="read" placeholder="进口压力">
					</div>
					<div class="col-xs-3" style="text-align:left;">
						<select class="unit" id="unit1" name="unit1" v-model="unit1" style="">
							<option value="kPa" selected="selected">kPa</option>
							<option value="mPa">mPa</option>
						</select>
					</div>
				</div>
				<div class="col-xs-12">
					
					<!--出口压力-->
					<div class="col-xs-3" >
						<input type="text" class="form-control input-sm" v-model="OutletPressure"  :disabled="read" placeholder="出口压力">
					</div>
					<div class="col-xs-3" style="text-align:left;">
						<select class="unit" id="unit2" name="unit2" v-model="unit2" >
							<option value="kPa" selected="selected">kPa</option>
							<option value="mPa">mPa</option>
						</select>
					</div>

					<!--关闭压力-->
					<div class="col-xs-3">
						<input type="text" class="form-control input-sm" v-model="LockupPressure" :disabled="read" placeholder="关闭压力">
					</div>
					<div class="col-xs-3" style="text-align:left;">
						<select class="unit" id="unit3" name="unit3" v-model="unit3" >
							<option value="kPa" selected="selected">kPa</option>
							<option value="mPa">mPa</option>
						</select>
					</div>
				</div>
				<div class="col-xs-12 item_qt">
					<div class="col-xs-3" >
						<input type="text" class="form-control input-sm" v-model="RadiationPressure" :disabled="read" placeholder="放散压力">
					</div>
					<div class="col-xs-3" style="text-align:left;">
						<select class="unit" id="unit4" name="unit4" v-model="unit4" >
							<option value="kPa" selected="selected">kPa</option>
							<option value="mPa">mPa</option>
						</select>
					</div>

					<div class="col-xs-3" style="">
						<input type="text" class="form-control input-sm" v-model="CutPressure" :disabled="read" placeholder="切断压力">
					</div>
					<div class="col-xs-3" style="text-align:left;">
						<select class="unit" id="unit5" name="unit5" v-model="unit5" >
							<option value="kPa" selected="selected">kPa</option>
							<option value="mPa">mPa</option>
						</select>
					</div>
				</div>

				<div class="col-xs-12 item_qt">	
					故障说明：<span style="font-size:12px; color:red;"></span>
					<input type="text" v-model="failurecatlog" :disabled="read" class="form-control input-sm"></input>
				</div>
				<div class="col-xs-12 item_qt">	
					维修情况：<span style="font-size:12px; color:red;">（必填）</span>
					<input type="text" v-model="RepairStatus" :disabled="read" class="form-control input-sm"></input>
				</div>

                <div class="col-xs-12 item_qt">
					<div class="col-xs-12">随行人员：</div>
                    <div class="col-xs-12">
                        <div class="col-xs-12"><input id="partner" v-model="partner" :disabled="read" class="form-control input-sm" type="text" placeholder=""></div>
                    </div>
				</div>
				
				
				<div class="col-xs-12 item_qt">任务备注：<textarea id="remark" v-model="remark" :disabled="read" class="form-control" rows="3"></textarea></div>
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
    name:"repairDetails",
    data(){
        return {
			taskid:this.$store.state.repairData.repair.Id,
			repair:this.$store.state.repairData.repair, 
			fileList:[],
			imgs:[],
			signstatus:this.$store.state.repairData.repair.SignState__c,
            isSign:this.$store.state.repairData.repair.SignState__c == '已签到' ? true : false ,  //已签到图标显示
            isSign2:this.$store.state.repairData.repair.SignState__c == '已签到' ? false : true ,  //未签到图标显示
			isComplete:false,	//签退按钮隐藏
			accessToken:localStorage.getItem("accessToken"),  //从内存中获取token
			Transportation:"有司机公车",    //交通工具 
			InletPressure:"",	  //进口压力
			OutletPressure:"",    //出口压力
			LockupPressure:"",    //关闭压力
			RadiationPressure:"", //放散压力
			CutPressure:"",		  //切断压力
			failurecatlog:"",     //故障说明
			RepairStatus:"",      //维修情况
			RepairDone:"true" ,       //完成情况
			partner:"",		//随行人员
			remark:"",		//备注
			read:false,		//控制输入框“只读”状态
			isable:false,	//控制按钮“无法操作”状态，在请求数据期间禁止重复键入
			//定位当前位置
           	position:{
              	lnglat:"",  //位置经纬度
              	lng:"",
              	lat:"",
              	position:new AMap.LngLat("",""),
              	location_type:"",  //定位类型
              	formattedAddress:"",  //解析的当前位置
              	info:"",
           	},
			dist:"",  //当前位置与设备之间的距离
			autoAssertLnglat:false,  //是否是自动维护的设备经纬度
			myLocation:false, //是否定位成功
			unit1:"kPa",
			unit2:"kPa",
			unit3:"kPa",
			unit4:"kPa",
			unit5:"kPa",
			back:{
				path:"/repair",
				name:"repair",
				params:{
					'keywords':this.$store.state.repairData.keywords ,
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
			uploadImg(this,this.taskid,imgname,imgurl,type,'MaintainPolling') ; 
		},
		
		
		//签到逻辑
        signin(){
            //调用接口，修改任务签到状态
			let _this = this ;
			var equLngLat = _this.$store.state.repairData.repair.Equipment__r.LongitudeAndLatitude__c ;  //设备经纬度
			var arr = equLngLat.split(/,|，/) ;  
			//经纬度为空，或者格式为“纬度，精度”的位置
			if(equLngLat == null || parseInt(arr[0])<parseInt(arr[1])){
				if(_this.position.info == "SUCCESS"){
					_this.isable = true; 
					_this.signCallout(_this,_this.position.lnglat,true) ; 

				}else{
					_this.$notify({
						title: '',
						message: '正在定位，请稍后。。。',
						duration:1500,
						type: 'info'
					}); 
				}
			}else{
				//距离计算
				_this.getDistance() ;
				if(_this.position.info=="SUCCESS"){
					var Precision = 'Precision__c' in _this.repair ? _this.repair.Precision__c : 200 ;
					
					if(parseInt(_this.dist) <= Precision){
						_this.isable = true; 
						_this.signCallout(_this,"",false) ; 
					}else{
						_this.$notify({
							title: '签到提示',
							message: "你还没有到位置呢，请到指定位置后签到,"+_this.dist+"米。" ,
							duration:1500,
							type: 'warning'
						}); 
					}
				}
				
			}
        },
		signCallout(vm,lnglat,isAutoAssertLnglat){
			var _this = vm ; 
			_this.$request_SF({
				method:"POST",
				url:"/PlatformSigninRest/doSignin",
				params:{
					taskid:_this.taskid,
					lnglat:lnglat,
				},
				headers:{
					Authorization:"Bearer "+this.accessToken
				}
			},res => {
				if(res.data == true){
					console.log('签到成功') ; 
					_this.$notify({
						title: '签到提示',
						message: '签到成功，稍后请上传照片后签退。',
						duration:1500,
						type: 'success'
					}); 
					_this.signstatus = '已签到' ; 
					_this.isSign = true ; 
					_this.isSign2 = false ; 
					_this.isable = false ; 

					_this.autoAssertLnglat = isAutoAssertLnglat ;   //自动签到
					//更新签到时间
					_this.signtime = true ;  
				}else{
					_this.$notify({
						title: '签到提示',
						message: '签到失败，请重新尝试或联系管理员。',
						duration:1500,
						type: 'warning'
					}); 
					_this.isable = false ; 
				}
			},err => {   //失败时的回调
				_this.$notify({
					title: '签到提示',
					message: '签到失败，请重新尝试或联系管理员。',
					duration:1500,
					type: 'error'
				}); 
				_this.isable = false ; 
			})
		},
		//签退方法
		signout(){
			let _this = this ; 
			//获取距离
			_this.getDistance() ; 

			//获取任务中配置的允许的定位精度，默认为200
			var Precision = 'Precision__c' in _this.repair ? _this.repair.Precision__c : 200 ;

			if(_this.position.info == "SUCCESS" && parseInt(_this.dist) <= Precision){
				//上传的照片不少于5张var count = 0 ; 
				var count = 0 ; 
				for(var i=0; i<_this.imgs.length;i++){
					if(_this.imgs[i].uploaded == true){
						count ++ ; 
					}
				}
				var imgcount = count + ('PicCount__c' in _this.repair ? _this.repair.PicCount__c : 0 ) ; 

				if(imgcount >= 5){ //上传照片的数量不少于5张
					if(_this.InletPressure.trim().length > 0 && _this.OutletPressure.trim().length > 0 && _this.LockupPressure.trim().length > 0 && _this.RadiationPressure.trim().length > 0 && _this.CutPressure.trim().length > 0  && _this.RepairStatus.trim().length > 0){

						_this.isable = true;   //按钮 “不可操作” 状态
						_this.read = true; 			//input 只读状态

						_this.$request_SF({
							method:"POST",
							url:"/PlatformSignoutRest/doSignout",
							params:{
								taskid:_this.taskid, 		//任务id
								Transportation:_this.Transportation,		//交通工具	
								InletPressure:_this.InletPressure + _this.unit1,			//进口压力
								OutletPressure:_this.OutletPressure + _this.unit2,		//出口压力
								LockupPressure:_this.LockupPressure + _this.unit3,		//关闭压力
								RadiationPressure:_this.RadiationPressure + _this.unit4,	//放散压力
								CutPressure:_this.CutPressure + _this.unit5,				//切断压力
								failurecatlog:_this.failurecatlog,			//故障说明
								RepairStatus:_this.RepairStatus,			//维修情况
								//pressure:"" ,  							//运行压力
								RepairDone:_this.RepairDone ,				//完成情况
								partner:_this.partner ,  					//随行人员
								remark:_this.remark ,  						//备注
							},
							headers:{
								Authorization:"Bearer "+this.accessToken
							}
						},res=>{
							if(res.data == true){
								_this.$notify({
									title: '签退提示',
									message: '签退成功。',
									duration:1500,
									type: 'success'
								}); 
								_this.isComplete = true ;	//签退 按钮隐藏
								_this.isable = false ; 		//按钮 “可操作” 状态

								//签退成功，返回到列表页面
								_this.$router.push('/repair') ;
							}else{
								_this.$notify({
									title: '签退提示',
									message: '签退失败，请联系管理员。',
									duration:1500,
									type: 'warning'
								});  
								_this.isable = false ; 
							}
						},err=>{

						}) ; 


					}else{
						_this.$notify({
							title: '',
							message: '请检查必填项是否填写完成。',
							duration:1500,
							type: 'warning'
						}); 
					}
				}else{
					_this.$notify({
						title: '',
						message: '请至少上传5张照片',
						duration:1500,
						type: 'warning'
					}); 
				}
			}else if(_this.position.info != "SUCCESS"){
				_this.$notify({
					title: '',
					message: '正在定位当前位置，请稍后。。。',
					duration:1500,
					type: 'info'
				});
			}else{
				_this.$notify({
					title: '',
					message: "您还没到目的地呢，请到目的地签退，"+_this.dist+"米。",
					duration:1500,
					type: 'warning'
				}); 
			}
		},
		//数据加载完成后调用，获取当前位置
		getPosition(){
			var _this = this ;
			_this.dist = "" ; 
        
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
					//alert("定位成功") ; 
					console.log(data) ; 
					_this.position.lnglat = data.position.lng+','+data.position.lat ;
					_this.position.lng = data.position.lng ;
					_this.position.lat = data.position.lat ;
					_this.position.position = data.position ; 
					_this.position.location_type = data.location_type ; 
					_this.position.formattedAddress = data.formattedAddress ; 
					_this.position.info = data.info ;

					_this.myLocation = true ;
					console.log("当前位置经纬度："+_this.position.lnglat) ; 
					_this.getDistance() ; 
				}

				function onError (data) {
					//alert("定位出错") ; 
					console.log(data) ;
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

		//距离计算,地址解析(设备经纬度或设备地址不为空的情况下计算距离)
		getDistance(){
			var _this = this ; 
			var equLngLat = _this.$store.state.repairData.repair.Equipment__r.LongitudeAndLatitude__c ;  //设备经纬度
			var arr = equLngLat.split(/,|，/) ;   //分割半角或全角，

			//定位当前位置成功
			if(_this.position.info == "SUCCESS"){ 
				//设备经纬度不为空
				if(equLngLat != null && equLngLat != "" && parseInt(arr[0])>parseInt(arr[1])){
					
					var start = _this.position.position ; 
					var end = new AMap.LngLat(arr[0],arr[1]) ; 
					_this.dist = Math.round(start.distance(end));   //当前位置和设备经纬度之间的直线距离
					console.log("距离2："+this.dist)  ;
				}
				//自定维护设备经纬度
				else if(_this.autoAssertLnglat == true){
					_this.dist = "0" ; 
				}
			}else {
				_this.$notify({
					title: '',
					message: "正在定位当前位置，请稍后。。。",
					duration:1500,
					type: 'info'
				}); 
			}
			
     	},

		 //刷新地址，重新定位
		refreshLocation(){
			this.myLocation = false ; 
			this.position = {} ; 
			this.getPosition() ; 
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
		border-bottom:1px solid #eeeeee ;
	}
	.item_qt {
		padding-top:8px;
		padding-bottom:8px;
	}

	.myBtn {
		width:90%; height:90%; background-color:#99CCFF; line-height:30px; border-radius:5px; 
	}
	.btnRuning {
		 background-color:#99CCFF;
	}
	.btnDefault {
		 background-color:#dddddd;
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

	.unit {
		border-radius:5px; width:50px; height:30px; display:inline; font-size:14px; border:0;
	}

	.unit:focus {
		background:none;
		outline:none;
		border:0px;
	}
	/**========================**/


	.form-control[disabled] {
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