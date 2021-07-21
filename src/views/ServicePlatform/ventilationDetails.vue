<!--
	Authro:凡朝剑
	Date:20200522
	Function:通气任务详情页
	Details:
		1.通气任务详情
		2.任务签到
		3.当前地理位置
		4.手机拍照上传照片
		5.任务签退
-->
<template>
    <div id="ventilationDetails" name="ventilationDetails" style="width:100%; height:100%; background-color:white;">
      	<!--头部区域-->
		<my-header pageName="通气任务详情" doSearch="false"  :backPath="back" />

		<div class="container-fluid el" style="padding-top:50px;">
			<!--基本信息-->
			<div class="col-xs-12 item">
				<div class="col-xs-2">任务：</div>
				<div class="col-xs-10">{{$store.state.ventilationData.ventilation.Name}}</div>
			</div>
            <div class="col-xs-12 item">
				<div class="col-xs-2">配额：</div>
				<div class="col-xs-10">{{$store.state.ventilationData.ventilation.Quota__c}} T</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">设备：</div>
				<div class="col-xs-10">{{'Device__r' in ventilation ? ventilation.Device__r.Name : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">名称：</div>
				<div class="col-xs-10">{{'Device__r' in ventilation ? ventilation.Device__r.DeviceName__c : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">里程：</div>
				<div class="col-xs-10">{{$store.state.ventilationData.ventilation.Mileage__c}}  （公里数）</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">地址：</div>
				<div class="col-xs-10">{{$store.state.ventilationData.ventilation.VentilationAddress__c}}</div>
			</div>
			
			<div class="col-xs-12 item">
				<div class="col-xs-2">坐标：</div>
				<div class="col-xs-10">{{'Device__r' in ventilation ? ventilation.Device__r.LongitudeAndLatitude__c : " "}}</div>
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">签到：</div>
				<div class="col-xs-10 "><span>{{signstatus}}</span><span :class="{'finished':isSign,'running':isSign2,'statusBox':true}" ></span></div>	
			</div>
			<div class="col-xs-12 item">
				<div class="col-xs-2">
					定位：
					<div style="padding-left:6px;"><img width="25px" @click="refreshLocation" height="25px" src="@/assets/ServicePlatform/imgs/refresh.png" /></div>
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
				<div class="col-xs-2">留言：</div> 
				<div class="col-xs-10 ">{{$store.state.ventilationData.ventilation.Note__c}} </div>	
			</div>
			<div class="col-xs-12 item">
				<span>通气时间：</span>
				<span>{{$store.state.ventilationData.ventilation.ExpectedVentilationTime__c | dataformat}}</span>	
			</div>
			<div class="col-xs-12 item">
				<span>联系人名：</span>
				<span>{{$store.state.ventilationData.ventilation.ConnectorName__c}}</span>	
			</div>
			<div class="col-xs-12" style="padding-top:8px; padding-bottom:8px; border-bottom:2px solid #e0eee8 ;">
				<span>联系电话：</span>
				<span>{{$store.state.ventilationData.ventilation.Phone__c}}</span>	
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
            <div v-if="isSign" id="afterSign" class="col-xs-12 item">
				<div class="col-xs-12">通气拍照:</div>
				<div class="col-xs-12" align="center">
					<span style="color:blue; font-size:13px;">
						你已经上传过{{'PicCount__c' in ventilation ? ventilation.PicCount__c : 0}}张照片,你至少还需上传{{('PicCount__c' in ventilation ? ventilation.PicCount__c : 0)>5 ? 0 : (5-('PicCount__c' in ventilation ? ventilation.PicCount__c : 0))}}张照片
					
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
					 <!-- 这儿是图片显示的位置 -->
					<div v-for="img in imgs" :key="img.name">
						<div class="imgbox">
						<!--防误触UI（一般）-->
							<div class="col-xs-3"><img class="uploadimg" :src="img.url"/></div>
							<div class="col-xs-6"><span style="line-height:80px;">{{img.name.indexOf('EQU')==-1?'通气单.jpg':'Equipment.jpg'}}</span></div>
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
				<div class="col-xs-12 item">
					<span>完成情况：</span>
					<select class="unit" id="isFinished" name="isFinished" v-model="IsVentilation" style="border-radius:5px; width:80px;">
						<option value="true" selected="selected">已完成</option>
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

                <!--<div class="col-xs-12 item_qt">
					<div class="col-xs-12">随行人员：</div>
                    <div class="col-xs-12">
                        <div class="col-xs-12"><input id="partner" v-model="partner" :disabled="read" class="form-control input-sm" type="text" placeholder=""></div>
                    </div>
				</div> -->
				<!--随行人员-->
				<div class="col-xs-12 item">
					<div class="col-xs-12">
						<span>随行人员：</span>
						<span @click="loadingPartner" class="common_shadow2" style="display:inline-block; padding:2px 5px; border-radius:4px; background-color:#F0FFFF; color:#00BFFF; ">
							选择
						</span>
					</div>

					<!--随行人员选择弹出框-->
					<div  v-if="afterSalesInfoPull" class="col-xs-12" style="position:relative;">
						<div v-loading="loadPartner" class="common_shadow2 afterSalesInfoBox">
							<p>选择随行人员</p>
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
						<span v-for="partner in partnerSelected"  :key="partner.userId" class="common_shadow2 partnerItem">
							<span style="color:green;">{{partner.name}}</span>
						</span>
					</div>
					
				</div>
				
				<div class="col-xs-12 item_qt">
					<div class="col-xs-4">	
						单程(公里数):
						<input type="text" v-model="mileage" @blur="mileageValidation($event)" :disabled="read"  class="form-control input-sm" />
					</div>
					<div class="col-xs-8">
						<span style="font-size:12px; color:#00BFFF;">(整数)，跨区域作业请填写。</span> <br />
						<span style="font-size:13px; color:red;">{{VDMsg.title}}</span>
					</div>
				</div>

				<div class="col-xs-12 item_qt">
					<div class="col-xs-12">现场联系人：</div>
                    <div class="col-xs-12">
                        <div class="col-xs-12"><input id="SiteContact" v-model="SiteContact" :disabled="read" class="form-control input-sm" type="text" placeholder=""></div>
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
import Moment from 'moment';

export default {
    name:"ventilationDetails",
    data(){
        return {
			taskid:this.$store.state.ventilationData.ventilation.Id,
			ventilation:this.$store.state.ventilationData.ventilation,
			fileList:[],
			imgs:[],
			signstatus:this.$store.state.ventilationData.ventilation.SignState__c,  						   //签到状态
            isSign:this.$store.state.ventilationData.ventilation.SignState__c == '已签到' ? true : false ,    //已签到图标显示
            isSign2:this.$store.state.ventilationData.ventilation.	SignState__c == '已签到' ? false : true ,  //未签到图标显示
			isComplete:false,								  //签退按钮隐藏
			accessToken:localStorage.getItem("accessToken"),  //从内存中获取token
			//pressure:"",	//运行压力
			Transportation:"有司机公车",		//交通工具
			IsVentilation:"true",		//完成情况
			InletPressure:"",		//进口压力
			OutletPressure:"",		//出口压力
			LockupPressure:"",		//关闭压力
			RadiationPressure:"",	//放散压力
			CutPressure:"",			//切断压力
			partner:"",		//随行人员
			SiteContact:"",
			remark:"",		//备注
			read:false,		//控制输入框“只读”状态
			isable:false,	//控制按钮“无法操作”状态，在请求数据期间禁止重复键入
			//定位当前位置
           	position:{
              	lnglat:"",  						//位置经纬度
              	lng:"",
              	lat:"",
              	position:new AMap.LngLat("",""),
              	location_type:"",  					//定位类型
              	formattedAddress:"", 				//解析的当前位置
              	info:"",
           	},
			dist:"",  				//当前位置与设备之间的距离
			autoAssertLnglat:false, //是否是自动维护的设备经纬度
			myLocation:false ,		//是否定位成功
			unit1:"kPa",
			unit2:"kPa",
			unit3:"kPa",
			unit4:"kPa",
			unit5:"kPa",
			back:{
				path:"/ventilation",
				name:"ventilation",
				params:{
					'keywords':this.$store.state.ventilationData.keywords ,
				}
			},
			//2021年8月 添加功能，随行，公里数
			partnerData:[], //存放随行加载数据的数组
			afterSalesInfoPull:false,  //是否拉取随行选择框
			loadPartner:false,  //随行数据是否加载完毕
			partnerSelected:[] ,  //已经选择的随行
			mileage:"" , 	//里程
				//里程整数校验消息
				VDMsg:{
					title:"",
					result:true
				},  
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

		//公里数整数校验
		mileageValidation(obj){
			var $el = $(obj.currentTarget) ;
			var value = $el.val() ;
			var re = /^[0-9]*$/;
			if(! re.test(value.trim())){
				this.VDMsg = {
					title:"请输入数字",
					result:false
				}   
			}else{
				this.VDMsg = {
					title:"",
					result:true 
				}
			}
		},

		//上传照片到服务器
		upload(imgname,imgurl,type){
			uploadImg(this,this.taskid,imgname,imgurl,type,'VentilationTask') ; 
		},

		//签到方法
        signin(){
            //调用接口，修改任务签到状态
            console.log(this.$store.state.ventilationData.ventilation.Id) ; 
			let _this = this ; 

			var equLngLat = _this.$store.state.ventilationData.ventilation.Device__r.LongitudeAndLatitude__c ;  //设备经纬度

			var arr = equLngLat.split(/,|，/) ;   //分割半角或全角，
			//经纬度为空，或者格式为“纬度，精度”的位置
			if(equLngLat == null || parseInt(arr[0])<parseInt(arr[1])){
				//签到并更新当前位置经纬度到设备
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
				if(_this.position.info == "SUCCESS"){
					var Precision = 'Precision__c' in _this.ventilation ? _this.ventilation.Precision__c : 200 ;
					
					if(parseInt(_this.dist) <= Precision){
						_this.isable = true; 
						this.signCallout(_this,"",false) ; 
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
				url:"/PlatformVentilationSigninRest/doSignin",
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
			if(! this.VDMsg.result){
				alert("请正确填写公里数，或清空数据。") ; 
				return false ;
			}
			let _this = this ; 
			//获取距离
			_this.getDistance() ; 
			//获取任务中配置的允许的定位精度，默认为200
			var Precision = 'Precision__c' in _this.ventilation ? _this.ventilation.Precision__c : 200 ;

			if(_this.position.info == "SUCCESS" && parseInt(_this.dist) <= Precision){
				//上传的照片数量不少于5张
				var count = 0 ; 
				for(var i=0; i<_this.imgs.length;i++){
					if(_this.imgs[i].uploaded == true){
						count ++ ; 
					}
				}
				var imgcount = count + ('PicCount__c' in _this.ventilation ? _this.ventilation.PicCount__c : 0 ) ; 
				if(imgcount >= 5){ 
					if(_this.InletPressure.trim().length > 0 && _this.OutletPressure.trim().length > 0 && _this.LockupPressure.trim().length > 0 && _this.RadiationPressure.trim().length > 0 && _this.CutPressure.trim().length > 0){
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
							url:"/PlatformVentilationSignoutRest/doSignout",
							params:{
								taskid:_this.taskid, //任务id
								Transportation:_this.Transportation, 		//交通工具
								IsVentilation:_this.IsVentilation ,			//完成情况
								InletPressure:_this.InletPressure + _this.unit1 ,			//进口压力
								OutletPressure:_this.OutletPressure + _this.unit1 ,		//出口压力
								LockupPressure:_this.LockupPressure + _this.unit1 ,		//关闭压力
								RadiationPressure:_this.RadiationPressure + _this.unit1 , //放散压力
								CutPressure:_this.CutPressure + _this.unit1 ,				//切断压力
								partner:_this.partner ,  //随行人员
								SiteContact:_this.SiteContact,   //现场联系人
								remark:_this.remark ,  //备注
								partnerIds:partnerIds,						//随行人员，userID以逗号分隔
								mileage:parseInt(_this.mileage) ,			//公里数
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
								_this.$router.push('/ventilation') ; 
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

					_this.myLocation = true ; //定位成功与否标记

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


		getDistance(){
			var _this = this ; 
			var equLngLat = _this.$store.state.ventilationData.ventilation.Device__r.LongitudeAndLatitude__c ;  //设备经纬度
			var arr = equLngLat.split(/,|，/) ;   //分割半角或全角，
			
			//定位当前位置成功
			if(_this.position.info == "SUCCESS"){ 
				//设备经纬度不为空
				if(equLngLat != null && equLngLat != "" && parseInt(arr[0])>parseInt(arr[1])){
					var start = _this.position.position ;
					var end = new AMap.LngLat(arr[0],arr[1]) ;  
					_this.dist = Math.round(start.distance(end));   //当前位置和设备经纬度之间的直线距离
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
		this.getPosition();
	},

}; 
</script>


<style lang="scss" scoped>
	
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
	input {
		border:1px solid #ddd;
		box-shadow: 0 0 0 0 #fff;
		height:28px;
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
		border-radius:5px; width:50px; height:30px; display:inline; font-size:12px; border:0;
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
	}

	#afterSalesInfo li {
		display: inline-block;
		padding:2px 5px; 
		margin:15px 10px 0 0 ;
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
		height:200px;  
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