<!--
	Authro:凡朝剑
	Date:20200522
	Function:巡检任务详情页
	Details:
		1.巡检任务详情
		2.任务签到
		3.当前地理位置
		4.手机拍照上传照片
		5.任务签退

-->
<template>
    <div id="pollingDetails" name="pollingDetails" style="width:100%; height:100%; background-color:white;">
       <!--头部区域-->
		<my-header pageName="巡检任务详情" doSearch="false"  :backPath="back" />

		<!--小弹出菜单，目前只有“停运”功能-->
		<!--“停运”：修改此任务签到，完成状态，修改字段“任务状态”为“停运”，以及“停运原因”-->
		<transition>
		<div v-if="stopTaskBtn" style="position:absolute; top:55px; right:35px; width:100px; height:100px; border:1px solid #ccc; background-color:#eee; border-radius:5px; z-index:1000;">
			<div @click.stop="stopReason = !stopReason" style="width:100%; height:28px; text-align:center; border-bottom:1px solid #ccc; border-radius:5px; margin-top:5px;" id="stopTaskBtn" >
				<span style="line-height:28px;">
					<span class="glyphicon glyphicon-play" style="color:red;"></span><span style="padding-left:5px;">停运</span>
				</span>
			</div>
		</div>
		</transition>

		<transition>
		<div v-if="stopReason" id="stopReason" style="position:absolute; width:100%; height:300px; top:250px; z-index:1000; background-color:white; padding:15px;">
			<div style="width:15px; height:15px; position:absolute; top:15px; right:15px;font-color:#bbb;" @click.stop="stopReason = false">
				<span class="glyphicon glyphicon-remove"></span>
			</div>

			<div style="width:100%; height:100%; background-color:#eee; border:1px solid #ccc; border-radius:5px; padding:15px;">
				<div class="col-xs-12" style="margin-top:20px; background-color:#eee;">
					<textarea id="reason" v-model="reason"  class="form-control" placeholder="请说明停运原因" rows="4"></textarea>
				</div>
				<div class="col-xs-12" style="background-color:#eee;">
					<span style="color:red; font-size:12px; background-color:#eee;">请务必与运营人员沟通确定后才能停止此任务。</span>
				</div>
				<div class="col-xs-12" style="text-align:center; background-color:#eee; margin-top:30px;">
					<button @click="stopTask()" class="btn btn-success" type="button" style="width:100px; height:30px; border-radius:8px; font-color:white;">提交</button>
				</div>
			</div>
		</div>
		</transition>
		<!--*****************************************************************-->


		<!--基本信息，签到签退-->
		<div class="container-fluid" style="padding-top:55px;">
			<!--基本信息-->
			<!--============================================================================-->
			<div class="col-xs-12 item">
				<div class="col-xs-2">任务：</div>
				<div class="col-xs-9">{{$store.state.pollingData.polling.Name}} </div>
				<div class="col-xs-1" style="text-align:right;"  @click.stop="stopTaskBtn = !stopTaskBtn">
					<span class="glyphicon glyphicon-option-vertical" style="color:red; font-colof:red;"></span>
				</div>
			</div>
			
		
			<div class="col-xs-12 item">
				<div class="col-xs-2">配额：</div>
				<div class="col-xs-10">{{$store.state.pollingData.polling.Quota__c}} T</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">设备：</div>
				<div class="col-xs-10">{{'Equipment__r' in polling ? polling.Equipment__r.Name : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">频次：</div>
				<div class="col-xs-10">{{'Equipment__r' in polling ? polling.Equipment__r.ContractFrequency__c : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">里程：</div>
				<div class="col-xs-10">{{$store.state.pollingData.polling.Mileage__c}}  （公里数） </div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">名称：</div>
				<div class="col-xs-10">{{'Equipment__r' in polling ? polling.Equipment__r.DeviceName__c : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">地址：</div>
				<div class="col-xs-10">{{$store.state.pollingData.polling.ActualLocation__c}} </div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">坐标：</div>
				<div class="col-xs-10">{{'Equipment__r' in polling ? polling.Equipment__r.LongitudeAndLatitude__c : " "}} </div>
			</div>

			<div class="col-xs-12 item">
				<div class="col-xs-2">签到：</div>
				<div class="col-xs-10 "><span>{{signstatus}}</span><span :class="{'finished':isSign,'running':isSign2,'statusBox':true}" ></span></div>	
			</div>
			<div v-if="'SignTime__c' in polling" class="col-xs-12 item">
				<div class="col-xs-3">签到时间：</div>
				<div class="col-xs-9">{{polling.SignTime__c | dataformat}}</div>
			</div>
			<div class="col-xs-12 item" v-if="signtime">
				<div class="col-xs-3">签到时间：</div>
				<div class="col-xs-9">{{getDateStr()}}</div>
			</div>

			<div class="col-xs-12" style="padding-top:8px; padding-bottom:8px; border-bottom:2px solid #e0eee8 ;">
				<div class="col-xs-2">
					定位：
					<div style="padding-left:5px;"><img width="25px" @click="refreshLocation" height="25px" src="@/assets/ServicePlatform/imgs/refresh.png" /></div>
				</div>
				<div class="col-xs-10 ">
					<span v-if="! myLocation">正在定位...</span>
						{{position.formattedAddress}} <br /> 经纬度：{{position.lnglat}} <br /> 定位法：{{position.location_type}}定位<br />
						距离：{{parseInt(dist)}}
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
            <div v-if="isSign" id="afterSign" class="col-xs-12 item_qt">
				<div class="col-xs-12">巡检拍照：</div>
				<div class="col-xs-12" align="center">
					<span style="color:blue; font-size:13px;">
					
					你已经上传过{{'PicCount__c' in polling ? polling.PicCount__c : 0}}张照片,你至少还需上传{{('PicCount__c' in polling ? polling.PicCount__c : 0)>3 ? 0 : (3-('PicCount__c' in polling ? polling.PicCount__c : 0))}}张照片
					
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
				

				<!--上传照片-->
				<div class="col-xs-12">
					<div v-for="img in imgs" :key="img.name">
						<div class="imgbox">
							<!--防误触UI（一般）-->
							<div class="col-xs-3"><img class="uploadimg" :src="img.url"/></div>
							<div class="col-xs-6"><span style="line-height:80px;">{{img.name.indexOf('EQU')==-1?'巡检单.jpg':'Equipment.jpg'}}</span></div>
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

				<div class="col-xs-12 item">
					<span>交通工具：</span>
						<select class="unit" id="mySelect" name="mySelect" v-model="Transportation" style="border-radius:5px; width:100px;">
							<option value="有司机公车" selected="selected">有司机公车</option>
							<option value="无司机公车">无司机公车</option>
							<option value="公共交通">公共交通</option>
							<option value="出租车">出租车</option>
							<option value="">--无--</option>
						</select>
				</div>

			    <!--签退表单-->
				<div class="col-xs-12 item_qt">
					<div class="col-xs-12">运行压力:</div>
                    <div class="col-xs-12">
                        <div class="col-xs-4">
							<input id="pressure" v-model="pressure" :disabled="read" class="form-control input-sm" type="text" placeholder="请填写运行压力">	
						</div>
						<div class="col-xs-4" style="text-align:left;">
							<select class="unit" id="unit" name="unit" v-model="unit" >
								<option value="kPa" selected="selected">kPa</option>
								<option value="mPa">mPa</option>
							</select>
						</div>
                        <div class="col-xs-4"><span style="line-height:30px; color:red; font-size:12px; text-align:left;">（必填）</span></div>
                    </div>
				</div>
				<!--随行人员-->
				<div class="col-xs-12 item">
					<div class="col-xs-12">
						<span>随行人员：</span>
						<span @click="loadingPartner" class="common_shadow2" style="display:inline-block; padding:2px 5px; border-radius:4px;  color:green; ">
							选择
						</span>
					</div>

					<!--随行人员选择弹出框-->
					<div  v-if="afterSalesInfoPull" class="col-xs-12" style="position:relative;">
						<div v-loading="loadPartner" class="common_shadow2 afterSalesInfoBox">
							<p>选择随行人员</p><span style="font-size:12px; color:green;">最多选择3个，第二次点击取消选择</span>
							<ul id="afterSalesInfo">
								<li v-for="partner in partnerData" 
									:key="partner.userId__c" 
									@click="addPartner($event)" 
									:value="partner.userId__c" :name="partner.Name" :class="partner.userId__c | filterPartner(partnerSelected)">
									
									{{partner.Name}}
									
								</li>
							</ul>
							
							<div @click="confirmChoose" class="doSomething" style="width:100px; position:absolute; bottom:10px; right:10px;">
								<span>确认选择</span>
							</div>

							<div @click="afterSalesInfoPull = false ;" class="doSomething" style="width:50px; position:absolute; bottom:10px; left:10px;">
								<span>关闭</span>
							</div>
						</div>
					</div>

					<!--随行人员展示-->
					<div class="col-xs-12" >
						<span v-for="partner in partnerSelected"  :key="partner.userId" class="common_shadow2 partnerItem" style="background-color:#F0FFFF;">
							<span style="color:#00BFFF;">{{partner.name}}</span>
						</span>
					</div>
					
				</div>

                <!--<div class="col-xs-12 item_qt">
					<div class="col-xs-12">随行人员:</div>
                    <div class="col-xs-12">
                        <div class="col-xs-8"><input id="partner" v-model="partner" :disabled="read" class="form-control input-sm" type="text" placeholder=""></div>
                    </div>
				</div>  -->

				<div class="col-xs-12 item_qt">
					<div class="col-xs-12">巡检记录:</div>
                    <div class="col-xs-12">
                        <div class="col-xs-12"><input id="PollingRecord" v-model="PollingRecord" :disabled="read" class="form-control input-sm" type="text" placeholder=""></div>
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
import Moment from 'moment';
import {capture,choiceImg,uploadImg} from '@/utils/taskCommons.js'

export default {
    name:"pollingDetails",
    data(){
        return {
			polling:this.$store.state.pollingData.polling,
			taskid:this.$store.state.pollingData.polling.Id,
			fileList:[],  	//存放已经上传的图片，组件自带
			imgs:[],  //存放照片的数组，{'url':_照片地址,'name':_照片名称,'type':_拍照类型(设备、巡检单),'uploaded':_是否上传,'uploadPercent':0,'uploadRuning':_是否正在上传}
			signstatus:this.$store.state.pollingData.polling.SignState__c,
            isSign:this.$store.state.pollingData.polling.SignState__c == '已签到' ? true : false ,  //已签到图标显示
            isSign2:this.$store.state.pollingData.polling.SignState__c == '已签到' ? false : true ,  //未签到图标显示
			isComplete:false,									//签退按钮隐藏
			accessToken:localStorage.getItem("accessToken"),  	//从内存中获取token
			Transportation:"有司机公车",						 //交通工具
			PollingRecord:"",   							    //巡检记录
			pressure:"",										//运行压力
			partner:"",											//随行人员
			remark:"",											//备注
			read:false,											//控制输入框“只读”状态
			isable:false,										//控制按钮“无法操作”状态，在请求数据期间禁止重复键入
			//定位
           	position:{
              	lnglat:"",  						//位置经纬度
              	lng:"",
              	lat:"",
              	position:new AMap.LngLat("",""),
              	location_type:"",  					//定位类型
              	formattedAddress:"",  				//解析的当前位置
              	info:"",
           	},
			dist:"",  					//当前位置与设备之间的距离
			//autoAssertLnglat:false,  	//是否是自动维护的设备经纬度
			myLocation:false , 			//是否定位成功
			unit:"kPa",  				//运行压力的单位
			reason:"",	 				//停运原因
			stopTaskBtn:false,   		//控制弹出 “停运” 按钮的标记
			stopReason:false,    		//控制弹出 “提交停运原因”框的标记
			signtime:false ,
			back:{
				path:"/polling",
				name:"polling",
				params:{
					'keywords':this.$store.state.pollingData.keywords ,
				}
			},
			//2021年8月 添加功能，随行，公里数
			partnerData:[], //存放随行加载数据的数组
			afterSalesInfoPull:false,  //是否拉取随行选择框
			loadPartner:false,  //随行数据是否加载完毕
			partnerSelected:[] ,  //已经选择的随行
			
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
		//加载随行人员数据
		loadingPartner(){
			this.loadPartner = true ;
			this.partnerData = [] ;
			//弹出框显示
			this.afterSalesInfoPull = true ;
			//从SF "售后随行"表中加载数据
			var _this = this ; 
			_this.$request_SF({
				method:"GET",
				url:"/AfterSalesInfo/getAll",
				headers:{
					Authorization:"Bearer "+this.accessToken
				}
			},res=>{
				console.log(res) ;
				_this.partnerData = res.data ; 
				this.loadPartner = false ;
				//加载完成后，将已经选择的随行进行回显标记

			},err=>{
				console.log("获取售后人员数据失败") ;
				this.loadPartner = false ;
				_this.$notify({
					title: '',
					message: '获取随行报错，程序错误。',
					duration:1500,
					type: 'error'
				}); 
			}) ; 
		},
		//选择随行人员
		addPartner(obj){
			var $el = $(obj.currentTarget) ;
			$el.toggleClass("partnerChoose") ;

		},
		//确认选择随行
		confirmChoose(){
			var _this = this ; 
			var $elArr = $("#afterSalesInfo").find(".partnerChoose") ; 
			if($elArr.length<=3){
				_this.partnerSelected = [] ; 
				//遍历已选择的元素，添加到“随行人员”数组中
				$elArr.each(function(i,e){
					var userId = $(e).attr("value").trim() ; 
					var name = $(e).attr("name").trim() ;
					_this.partnerSelected.push({'userId':userId,'name':name}) ; 
				}) ;
				_this.afterSalesInfoPull = false ; 
			}else{
				alert("随行不可以超过3个，请重新选择。") ; 
			}
		},

		//上传照片到服务器
		upload(imgname,imgurl,type){
			uploadImg(this,this.taskid,imgname,imgurl,type,'MaintainPolling') ; 
		},
		
		//签到方法
        signin(){
            //调用接口，修改任务签到状态
			let _this = this ;
			var equLngLat = _this.polling.Equipment__r.LongitudeAndLatitude__c ;  //设备经纬度
			
			if(_this.position.info != "SUCCESS"){
				_this.$notify({
					title: '',
					message: '正在定位，请稍后。。。',
					duration:1500,
					type: 'info'
				}); 
				return false ; 
			}

			//经纬度为空，或者格式为“纬度，精度”的位置
			if(equLngLat == null || equLngLat == 'undefined'){
				_this.isable = true; 
				_this.signCallout(_this,_this.position.lnglat,true) ; 
			}else{
				var arr = equLngLat.split(/,|，/) ;  
				if(parseInt(arr[0])<parseInt(arr[1])){
					_this.isable = true; 
					_this.signCallout(_this,_this.position.lnglat) ; 
				}else{
					//_this.getDistance() ;
					var Precision = 'Precision__c' in _this.polling ? _this.polling.Precision__c : 200 ;
					
					if(parseInt(_this.dist) <= Precision){
						_this.isable = true; 
						_this.signCallout(_this,"") ; 
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
		signCallout(vm,lnglat){
			var _this = vm ; 
			_this.$request_SF({
				method:"POST",
				url:"/PlatformSigninRest/doSignin",
				params:{
					taskid:_this.$store.state.pollingData.polling.Id,
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

					//_this.autoAssertLnglat = isAutoAssertLnglat ;   //自动签到
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
			//_this.getDistance() ; 

			//获取任务中配置的允许的定位精度，默认为200
			var Precision = 'Precision__c' in _this.polling ? _this.polling.Precision__c : 200 ;

			//距离大于200米不能签到
			if(_this.position.info == "SUCCESS" && parseInt(_this.dist) <= Precision){
				//上传的照片数量不少于3张
				var count = 0 ; 
				for(var i=0; i<_this.imgs.length;i++){
					if(_this.imgs[i].uploaded == true){
						count = count + 1 ; 
					}
				}
				var imgcount = count + ('PicCount__c' in _this.polling ? _this.polling.PicCount__c : 0 ) ; 
				if(imgcount >= 3){ //上传照片的数量不少于3张
					if(this.pressure.trim().length == 0){
						//运行压力必填
						_this.$notify({
							title: '',
							message: '请填写压力值',
							duration:1500,
							type: 'warning'
						}); 
						_this.isable = false ; 
					}else{
						_this.read = true; 			//input 只读状态
						_this.isable = true;   //按钮 “不可操作” 状态

						//随行人员
						var partnerArr = [] ;
						if(_this.partnerSelected.length > 0){
							for(var i=0 ;i<_this.partnerSelected.length ;i++){
								var userId = _this.partnerSelected[i].userId ; 
								partnerArr.push(userId) ; 
							}
						}

						var partnerIds = partnerArr.join(',') ;

						_this.$request_SF({
							method:"POST",
							url:"/PlatformSignoutRest/doSignout",
							params:{
								taskid:_this.$store.state.pollingData.polling.Id,  
								Transportation:_this.Transportation,  //交通工具
								PollingRecord:_this.PollingRecord,  //巡检记录
								pressure:_this.pressure + _this.unit ,  //运行压力
								partner:_this.partner ,  //随行人员
								remark:_this.remark ,  //备注
								partnerIds:partnerIds,						//随行人员，userID以逗号分隔
							},
							headers:{
								Authorization:"Bearer "+this.accessToken
							}
						},res=>{
							console.log(res) ; 
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
								_this.$router.push('/polling') ; 
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

					}

				}else{
					_this.$notify({
						title: '',
						message: '请至少上传3张照片',
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
					enableHighAccuracy: true,
					timeout: 10000,
					zoomToAccuracy: true,     
				})
				geolocation.getCurrentPosition()
				AMap.event.addListener(geolocation, 'complete', onComplete)
				AMap.event.addListener(geolocation, 'error', onError)

				function onComplete (data) {
					console.log(data) ; 
					_this.position.lnglat = data.position.lng+','+data.position.lat ;
					_this.position.lng = data.position.lng ;
					_this.position.lat = data.position.lat ;
					_this.position.position = data.position ; 
					_this.position.location_type = data.location_type ; 
					_this.position.formattedAddress = data.formattedAddress ; 
					_this.position.info = data.info ;

					_this.myLocation = true ; 

					_this.getDistance() ; 
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

		//距离计算,地址解析(设备经纬度或设备地址不为空的情况下计算距离)
		getDistance(){
			var _this = this ; 
			var equLngLat = _this.polling.Equipment__r.LongitudeAndLatitude__c ;  //设备经纬度

			//定位当前位置成功
			if(! _this.position.info == "SUCCESS"){ 
				_this.$notify({
					title: '',
					message: "正在定位当前位置，请稍后。。。",
					duration:1500,
					type: 'info'
				}); 
				return false ; 
			}

			//设备经纬度不为空
			if(equLngLat != null && equLngLat != "" && equLngLat != 'undefined'){
				var arr = equLngLat.split(/,|，/) ;   //分割半角或全角，
				if(parseInt(arr[0])>parseInt(arr[1])){
					var start = _this.position.position ; 
					var end = new AMap.LngLat(arr[0],arr[1]) ; 
					_this.dist = Math.round(start.distance(end));   //当前位置和设备经纬度之间的直线距离
					console.log("距离2："+this.dist)  ;
				}else {
					this.dist = 0 ; 
				}
				
			}else {
				_this.dist = 0 ; 
			}
     	},

		//刷新地址，重新定位
		refreshLocation(){
			this.myLocation = false ; 
			this.position = {} ; 
			this.getPosition() ; 
		},

		//任务停运方法
		stopTask(){
			let _this = this ; 
			var taskid = this.$store.state.pollingData.polling.Id ; 

			_this.$request_SF({
				method:"GET", 
				url:"/PlatformPollingTerMination/stop ",
				params:{
					taskid:taskid,
					reason:_this.reason
				},
				headers:{
					Authorization:"Bearer "+this.accessToken
				}
			},res=>{
				console.log(res) ; 
				if(res.data == 'success'){
					console.log('任务停运成功') ; 
					//_this.$message.success("停运成功"); 
					_this.$notify({
						title: '',
						message: "停运成功",
						duration:1500,
						type: 'success'
					}); 
					//停运成功，返回到列表页面
					_this.$router.push('/polling') ; 
				}else{
					//_this.$message.error("停运失败，请联系管理员。"+res.data);
					_this.$notify({
						title: '',
						message: "停运失败,请重试或联系管理员。",
						duration:1500,
						type: 'warning'
					}); 
					
				}
			},err=>{
				_this.$notify({
					title: '',
					message: "停运失败，请联系管理员。",
					duration:1500,
					type: 'error'
				}); 
			}) ;
		},
		//当前时间格式化
		getDateStr(){
			var now = new Date() ; 
			var dataStr = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds() ;
			return dataStr ; 
		},


    },
	filters:{
		dataformat:function(datastr,pattern=""){
			return Moment(datastr).format('YYYY-MM-DD HH:mm:ss')
		},
		filterPartner(userId,partnerSelected){
			var arrStr = JSON.stringify(partnerSelected) ; 
			//查找已经选择了的随行，并与传递过来的随行id进行匹配
			if(arrStr.indexOf(userId) != -1){
				return {'partnerChoose':true} ; 
			}else{
				return {'partnerChoose':false} ; 
			}
		}
	},
	mounted(){
        this.getPosition() ; 
	},

}; 
</script>


<style lang="scss" scoped>

	//transition全场动画
	.v-enter,
	.v-leave-to{
		opacity:0 ;
		transform:translateY(-100px);
	}
	
	/*v-enter-active:入场动画时间段*/
	/*v-leave-active：离场动画时间段*/
	.v-enter-active,
	.v-leave-active{
		transition:all 0.4s ease;
	}
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
		font-weight:400;
	}
	.container-fluid {
		padding-right:15px;
		padding-left:15px;
	}
	.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12  {
		padding-left:0px;
		padding-right:0px;
	}
	
	input {
		border:1px solid #ddd;
		box-shadow: 0 0 0 0 #fff;
		height:28px;
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

	#afterSalesInfo {
		list-style: none;
		padding-left: 0;
		padding:5px 0 60px 0;
	}

	#afterSalesInfo li {
		display: inline-block;
		padding:2px 5px; 
		margin:10px 10px 0 0 ;
		border-radius: 4px;
		font-family:'雅黑' ;
		font-weight:300;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)  ; 
	}

	.afterSalesInfoBox {
		position:absolute; 
		top:-25px; 
		right:0; 
		width:80%;  
		z-index:1000; 
		background-color:#fff; 
		border-radius:4px; padding:10px;
		border:1px solid #87CEFA ;
		box-shadow: 0 0 5px 1px #87CEFA;
	}

	.partnerItem {
		margin:10px 10px 0 0; display:inline-block; padding:2px 5px; border-radius:4px;
	}

	.partnerChoose {
		background-color: #F0FFFF;
		color:#00BFFF;
	}

</style>