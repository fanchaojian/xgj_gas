<!--
	Author:凡朝剑
	Date:20200522
	Function:待通气任务列表页面
	Details:
		1.显示待通气任务
		2.显示任务签到状态
		3.显示每个任务对应的设备信息
		4.任务设备地址导航跳转
-->
<template>
    <div id="ventilation" name="ventilation" style="width:100%; height:100%; background-color:white;">
       <!--头部区域-->
		<div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span @click="$router.push('/serviceHome')" style="color:#777;" class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-8 full_height" style="line-height:50px;">
				<div  style="line-height:inherit; display:inline;">
					<span style=" line-height:inherit;">
						<input v-model="keywords"  type="text" placeholder="请输入任务名称"/>
					</span>
				</div>
			</div>
			<div class="col-xs-2"></div>
		</div>

		<mt-loadmore 
				:autoFill="false"
				:top-method="loadTop" 
				:bottom-all-loaded="loadFinished" 
				ref="loadmore">
			<!--数据体-->
			<!--============================================================-->
			<div v-loading="loadingData" :style="dataBox" class="container-fluid">
				<!--任务列表，遍历体-->
				<div  v-for="(ventilation,i) in search(keywords)" :id="ventilation.Id" :index="i" :key="ventilation.Id" class="col-xs-12 container-fluid splitLine">
					<div id="item" class="col-xs-12" style="padding:15px 0px;">
						<div @click.stop="toDetails(ventilation)" class="col-xs-9"><p style="font-size:14px; font-weight:400;">{{ventilation.Name}}</p></div>
						<div class="col-xs-2"><span style="font-size:12px;">签到</span><span :class="{'sbox':true,'finished':ventilation.SignState__c=='已签到' ? true:false,'nFinished':ventilation.SignState__c=='已签到' ? false:true}"></span></div>
						<div class="col-xs-1" align="right">
							<a @click.stop="showDetails($event)">
								<span class="glyphicon glyphicon-menu-down"></span>
							</a>
						</div>
					</div>
					
					<!--任务详情信息-->
					<transition>
						<div id="details" class="col-xs-12" style="padding-bottom:10px; display:none; padding-left:15px;">
							<div class="ds" style="color:#ccc; font-weight:bold;">基础信息</div>
							<div class="ds ln1">编号：{{ventilation.Device__r.Name}}</div>
							<div class="ds ln2">名称：{{ventilation.Device__r.DeviceName__c}}</div>
							<div class="ds ln2">预计通气时间：{{ventilation.ExpectedVentilationTime__c | dataformat}}</div>
							<div  class="col-xs-12 ln2" style=" padding-top:5px;">
								<div class="col-xs-10 ds">地址：{{ventilation.Device__r.DeviceAddress__c}}</div>
								<a :href="toAmap(ventilation)" class="col-xs-2 ds" align="right">导航<a class="glyphicon glyphicon-send ds"></a></a>
							</div>
							
						</div>
					</transition>
				</div>	

				<!---===没有数据时的提示==-->
				<div class="col-xs-12" v-if="ventilationListAll.length == 0"  style="text-align:center;">
					<div>你目前还没有通气任务呢。</div>
				</div>
			</div>
			<!--=====================================================-->
			
		<!--</mt-loadmore>
		</div>
		
		</div>  -->
		</mt-loadmore>
		
    </div>
</template>


<script> 
import Moment from 'moment';
	
export default {
    name:"ventilation",
    data(){
        return {
			keywords:"", //关键字搜索
            ventilationListAll:[], //所有待巡检任务
		    topStatus: "", //顶部下拉加载状态
		    accessToken:localStorage.getItem("accessToken"),
			loadFinished:true,  //数据加载是否加载完毕 mint-ui loadmore 
			loadingData:false ,  //处于加载状态，element 组件 v-loading
			//数据盒子属性style
			dataBox:{
				"margin-top":"55px",
				"padding":"0 15px",
				"height": window.screen.height-100+"px",
			},
        } ; 
    },
    methods:{
		//显示详情
		showDetails:function(event){
			console.log(event) ; 
			var $this = $(event.target) ; 
			$this.parents("#item").next().toggle(); 
			$this.toggleClass("active") ;  
			if($this.hasClass("active")){
				$this.removeClass("glyphicon-menu-down") ; 
				$this.addClass("glyphicon-menu-up") ; 
			}else{
				$this.addClass("glyphicon-menu-down") ; 
				$this.removeClass("glyphicon-menu-up") ; 
			}
		},
		search:function(keywords){  //根据关键字对数据进行搜索
			var newList = [] ;
			this.ventilationListAll.forEach(item => {
				if(item.Name.indexOf(keywords) != -1 || item.Device__r.Name.indexOf(keywords) != -1){ //搜索到了
					newList.push(item);
				}
			});
			return newList ; 
		},
		//导航地址处理
		toAmap(ventilation){
			var address =ventilation.Device__r.DeviceAddress__c ; 
			if('LongitudeAndLatitude__c' in ventilation.Device__r){
				var lng = ventilation.Device__r.LongitudeAndLatitude__c.split(/,|，/)[0] ;
				var lat = ventilation.Device__r.LongitudeAndLatitude__c.split(/,|，/)[1] ;

				var myHref = "androidamap://viewMap?sourceApplication=appname&poiname="+address+"&lat="+lat+"&lon="+lng+"&dev=0";
				// var myHref = "iosamap://viewMap?sourceApplication=applicationName&poiname="+address+"&lat="+lat+"&lon="+lng+"&dev=1";
				return myHref ; 
			}else{
				return "#" ; 
			}
		},
		loadTop() {
			//保持加载状态的动画
			this.loadFinished = false ;  
			this.loadingData = true ;  
			this.getVentilation();
			
			this.$refs.loadmore.onTopLoaded();
		},
		back(){
			this.$route.meta.keepAlive =false; 
			this.$router.push('/platform') ;
		},		
		toDetails(ventilation){
			//将数据放入store
			var params = {
					'ventilation': ventilation ,
					'keywords':this.keywords,
				}
			this.$store.commit('setVentilationDetails',params) ;
			this.$router.push({
				name:"ventilationDetails",
			}) ;
		},
		//加载待巡检数据
		getVentilation(){
			var _this = this ; 
			//启动加载动画
			this.loadFinished = false ;  
			this.loadingData = true ; 
			_this.ventilationListAll = [] ;    //清空数据集

			_this.$request_SF({
				method:"get",
				url:"/VentilationTaskRest/getTask",
				params:{
					username:localStorage.userName,
				},
				headers:{
					Authorization:"Bearer "+this.accessToken
				}
			},res=>{
				if(res.statusText == "OK"){
					_this.ventilationListAll = res.data ; 
					
					//加载动画停止
					this.loadFinished = true ;  
					this.loadingData = false ; 
					console.log(res.data) ; 
				}
			},err=>{

			}) ;
		}
    },
	filters:{
		dataformat:function(datastr,pattern=""){
			return Moment(datastr).format('YYYY-MM-DD HH:mm:ss')
		}
	},
	mounted(){
		this.getVentilation() ;

		//获取参数传递过来的关键字
		
		if('keywords' in this.$route.params){

			this.keywords = this.$route.params.keywords ; 
		}else {
			this.keywords = "" ;
		}

	}

}; 
</script>


<style lang="scss" scoped>
	#header{
		position:fixed;
		width:inherit;
		height:55px;;
		background-color:#e0eee8;
		border-bottom:1px solid #e0eee8;
		box-shadow: 0 0px 5px 1px #e0eee8;
		top:0px;
		z-index:100;
		padding-left:15px;
		padding-right:15px;
		z-index: 1000;
	}

	#header .iconfont {
		font-size:25px;
	}

    #searchHere {
		width:50px; 
		height:30px; 
		border-radius:10px;

		-moz-transition: width 0.8s; /* Firefox 4 */
		-webkit-transition: width 0.8s; /* Safari 和 Chrome */
		-o-transition: width 0.8s; /* Opera */
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
		font-size:13px ; 
	}
  
	.lineShadow {
		margin:0 ; 
		padding:0 ; 
		box-shadow: 0px 1px 4px black;
	}
	.topBg {
		background:#e0eee8;
	}
	.splitLine {
		border-bottom:2px solid #e0f0e9;
	}
	
	.itemline {
		width:100%; height:2px; background-color:#f4f4f4;
	}
	.el {
		padding:0 ; 
	}
	
	.ln1 {
		border-bottom:1px solid #eeeeee; border-top:1px solid #eeeeee; padding-bottom:5px; padding-top:5px; 
	}
	.ln2 {
		border-bottom:1px solid #eeeeee; padding-top:5px; padding-bottom:5px; 
	}
	
	.sbox {
		height:10px; width:10px;  display:inline-block; border-radius:2px; margin-left:5px;
	}
	.finished {
		background-color:green;
	}
	.nFinished {
		background-color:orange;
	}

	//transition全场动画
	.v-enter,
	.v-leave-to{
		opacity:0 ;
		transform:translateY(0);
	}
	
	/*v-enter-active:入场动画时间段*/
	/*v-leave-active：离场动画时间段*/
	.v-enter-active,
	.v-leave-active{
		transition:all 0.4s ease;
	}

</style>