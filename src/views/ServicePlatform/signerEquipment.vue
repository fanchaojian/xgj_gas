<!--
	Author:凡朝剑
	Date:20200522
	Function:我的代管设备
-->
<template>
    <div id="signerEquipment" name="signerEquipment" style="width:100%; height:100%; background-color:white;">
		<!--头部区域-->
		<div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span @click="$router.push('/serviceHome')" style="color:#777;" class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-8 full_height" style="line-height:50px;">
				<div  style="line-height:inherit; display:inline;">
					<span style=" line-height:inherit;">
						<input v-model="keywords"  type="text" placeholder="请输入设备名称"/>
					</span>
				</div>
			</div>
			<div class="col-xs-2"></div>
		</div>
		<!--上拉刷新-->
		<mt-loadmore 
				:autoFill="false"
				:top-method="loadTop" 
				:bottom-all-loaded="loadFinished" 
				ref="loadmore">
			<!--数据体-->
			<!--============================================================-->
			<div v-loading="loadingData" id="dataBox" :style="dataBox">
				<!--任务列表，遍历体-->
				<div v-for="(equ,i) in search(keywords)" :id="equ.Id" :index="i" :key="equ.Id"  class="col-xs-12 splitLine" >
					<div id="item" class="col-xs-12" style="padding:15px 0px;">
						<div class="col-xs-11"><p style="font-size:14px;">{{equ.DeviceName__c}}</p></div>
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
							<div class="ds ln2">编号：{{equ.Name}}</div>
							<div class="ds ln2">联系人：{{'siteContactName__c' in equ ? equ.siteContactName__c:''}},{{'siteContactTel__c' in equ ? equ.siteContactTel__c : ''}}</div>
							<div  class="col-xs-12 ln2" style=" padding-top:5px;">
								<div class="col-xs-10 ds">地址：{{'DeviceAddress__c' in equ ? equ.DeviceAddress__c : ''}}</div> 
								<a :href="toAmap(equ)" class="col-xs-2 ds" align="right">导航<a class="glyphicon glyphicon-send ds"></a></a>
							</div>
							<div class="ds" style="color:#ccc; font-weight:bold;">任务概览</div>
							<div class="col-xs-12">
								<div class="col-xs-4 taskOverview">
									<div @click="toExistPolling(equ)" class="doSomething"><span>待完成巡检</span></div>
								</div>
								<div class="col-xs-4 taskOverview">
									<div @click="toExistRepair(equ)" class="doSomething"><span>待完成维修</span></div>
								</div>
								<div class="col-xs-4 taskOverview">
									<div @click="toExistVentilation(equ)"  class="doSomething"><span>待完成通气</span></div>
								</div>
							</div>
							<div class="col-xs-12">
								<div class="col-xs-4 taskOverview">
									<div @click="toPollingFinished(equ)" class="doSomething" style="background-color:#e0eee8;"><span>已完成巡检</span></div>
								</div>
								<div class="col-xs-4 taskOverview">
									<div @click="toRepairFinished(equ)" class="doSomething" style="background-color:#e0eee8;"><span>已完成维修</span></div>
								</div>
								<div class="col-xs-4 taskOverview">
									<div @click="toVentilationFinished(equ)" class="doSomething" style="background-color:#e0eee8;"><span>已完成通气</span></div>
								</div>
							</div>
							
						</div>
					</transition>
				</div>	

				<!---===没有数据时的提示==-->
				<div  v-if="equipmentListAll.length == 0"  style="text-align:center;">
					<div>你目前还没有巡检任务呢。</div>
				</div>
			</div>
			
			
		<!--</mt-loadmore>
		</div>
		
		</div> -->
		</mt-loadmore>
		
    </div>
</template>


<script> 
import MyHeader from '@/components/ServicePlatform/Header.vue';

export default {
    name:"signerEquipment",
    data(){
        return {
		   	keywords:"",
        	equipmentListAll:[], //所有代管设备
			accessToken:localStorage.getItem("accessToken"),
			loadFinished:true,  //数据加载是否加载完毕 mint-ui loadmore 
			loadingData:false ,  //处于加载状态，element 组件 v-loading
			//数据盒子属性style
			dataBox:{
				"margin-top":"55px",
				"padding":"0 15px",
				"height": window.screen.height-100+"px",
			},
			back:{
				path:'/'
			}
        } ; 
    },
	components:{
		MyHeader
	},
    methods:{
		//获取屏幕的高度

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
			this.equipmentListAll.forEach(item => {
				if(item.Name.indexOf(keywords) != -1 || item.DeviceName__c.indexOf(keywords) != -1){
					newList.push(item);
				}
			});
			return newList ; 
		}, 
		//导航地址处理
		toAmap(equ){
			var address = 'DeviceAddress__c' in equ ? equ.DeviceAddress__c : '' ; 
			if('LongitudeAndLatitude__c' in equ){
				var lng = equ.LongitudeAndLatitude__c.split(/,|，/)[0] ;
				var lat = equ.LongitudeAndLatitude__c.split(/,|，/)[1] ;

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
			
			this.equipmentListAll = [] ; 
			
			this.getEquipment() ; 
			
			this.$refs.loadmore.onTopLoaded();
		},
	
		//加载待巡检数据
		getEquipment(){
			//保持加载状态的动画
			this.loadFinished = false ;  
			this.loadingData = true ; 
			var _this = this ; 
			_this.$request_SF({
				method:"get",
				url:"/SignerEquipmentRest/getEqu",
				params:{
					username:localStorage.getItem("userName"),
				},
				headers:{
					Authorization:"Bearer "+localStorage.getItem("accessToken")
				}
			},res=>{
				if(res.data.length>0){
					console.log(res.data) ;

					_this.equipmentListAll = res.data ; 
					//加载动画停止
					_this.loadFinished = true ;  
					_this.loadingData = false ;  
					
				}
			},err=>{
				_this.$notify({
					message: "加载数据失败，程序错误，请联系管理员。" ,
					duration:1500,
					type: 'error'
				}); 
			}) ; 
		},
		//待完成巡检任务
		toExistPolling(equ){
			var equ_name = equ.Name ; 
			this.$router.push({
				path:'/polling',
				name:'polling',
				params:{
					keywords:equ_name
				}
			}) ;
		},
		//待完成维修任务
		toExistRepair(equ){
			var equ_name = equ.Name ; 
			this.$router.push({
				name:'repair',
				params:{
					keywords:equ_name
				}
			}) ;
		},
		//待完成通气任务
		toExistVentilation(equ){
			var equ_name = equ.Name ; 
			this.$router.push({
				name:'repair',
				params:{
					keywords:equ_name
				}
			}) ;
		}, 
		//已完成巡检任务
		toPollingFinished(equ){
			var equid = equ.Id ; 
			this.$router.push({
				name:'pollingFinished',
				params:{
					equid:equid
				}
			}) ;
		},
		//已完成维修任务
		toRepairFinished(equ){
			var equid = equ.Id ; 
			this.$router.push({
				name:'repairFinished',
				params:{
					equid:equid
				}
			}) ;
		},
		//已完成通气任务
		toVentilationFinished(equ){
			var equid = equ.Id ; 
			this.$router.push({
				name:'ventilationFinished',
				params:{
					equid:equid  
 				}
			}) ;
		},

    },
	mounted(){
		
		this.getEquipment() ;
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
		font-size:13px ; 
	}
  
	.lineShadow {
		margin:0 ; 
		padding:0 ; 
		box-shadow: 0px 1px 4px black;
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

	.taskOverview {
		padding:0 10px; margin-top:5px;
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