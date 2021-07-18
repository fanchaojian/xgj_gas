<!--
	Author:凡朝剑
	Date:20200522
	Function:待巡检任务列表页面
	Details:
		1.显示待巡检任务
		2.显示任务签到状态
		3.显示每个任务对应的设备信息
		4.任务设备地址导航跳转
-->
<template>
    <div id="polling" name="polling" style="width:100%; height:100%; background-color:white;">
     	<!--头部区域-->
		<div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span @click="$router.push('/signerEquipment')" style="color:#777;" class="iconfont icon-left"></span>
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
		

		<!--上拉刷新-->
		<!---<mt-loadmore :top-method="loadTop" class="page-loadmore" style="width:100%; height:100%;" v-loading="loadSuccess"    :auto-fill="false" ref="loadmore">  
      -->
			<!--数据体-->
			<!--============================================================-->
			<div :style="dataBox" class="container-fluid"  v-loading="loadSuccess" >
				<!--任务列表，遍历体-->
				<div  v-for="(polling,i) in search(keywords)" :id="polling.Id" :index="i" :key="polling.Id" class="col-xs-12 splitLine" >
					<div id="item" class="col-xs-12" style="line-height:50px;">
						<div class="col-xs-10">{{polling.Name}}</div>
						
						<div class="col-xs-2" align="right">
							<a @click.stop="showDetails($event)">
								<span class="glyphicon glyphicon-menu-down"></span>
							</a>
						</div>
					</div>
					
					<!--任务详情信息-->
					<transition>
						<div id="details" class="col-xs-12" style="padding-bottom:10px; display:none; padding-left:15px;">
							<div class="ds" style="color:#ccc; font-weight:bold;">基本信息</div>
							<div class="ds ln1">设备编号：{{polling.Equipment__r.Name}}</div>
							<div class="ds ln2">设备名称：{{polling.Equipment__r.DeviceName__c}}</div>
                            <div class="ds ln2">签到/退人：{{polling.SignPerson__r.Name}}</div>
                            <div class="ds ln2">完成状态：已完成</div>
						</div>
					</transition>
				</div>	

				<!---===没有数据时的提示==-->
				<div class="col-xs-12" v-if="pollingListAll.length == 0"  style="text-align:center;">
					<div>近期没有已完成的巡检。</div>
				</div>
			</div>
			<!--=====================================================-->

			
		
		<!--</mt-loadmore> -->
		
    </div>
</template>


<script> 
export default {
    name:"polling",
    data(){
        return {
			loadSuccess:true, //数据是否加载完成，element-ui加载动画效果
		   	keywords:"",
        	pollingListAll:[], //所有待巡检任务
			topStatus: "", //顶部下拉加载状态
			accessToken:localStorage.getItem("accessToken"),
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
			this.pollingListAll.forEach(item => {
				if(item.Name.indexOf(keywords) != -1 || item.Equipment__r.Name.indexOf(keywords) != -1){ //搜索到了(通过任务名称或者设备编号进行搜索)
					newList.push(item);
				}
			});
			return newList ; 
		},	
		//加载待巡检数据
		getPolling(){
			var _this = this ; 
			_this.loadSuccess = true ;  //加载动画启动
			_this.pollingListAll = [] ;    //清空数据集
			
			_this.$request_SF({
				method:"get",
				url:"/QueryTaskByEquRest/getTask",
				params:{
                    equid:_this.$route.params.equid,
					type:"polling", 
				},
				headers:{
					Authorization:"Bearer "+this.accessToken
				}
			},res=>{
				if(res.data.length>0 || res.statusText == "OK"){
					_this.pollingListAll = res.data ; 
					_this.loadSuccess = false ;   //加载完成
					console.log(res.data) ; 
				}
			},err=>{

			}) ; 
		}
    },
	mounted(){
		
		this.getPolling() ;

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