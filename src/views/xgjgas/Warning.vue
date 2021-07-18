<!--报警信息-->
<template>
<div class="full_box">
	<div class="full_box" style="background-color:#fff;">
		<!--头部区域-->
		<my-header pageName="报警列表" doSearch="false" @func="getKeywords" backPath="/gasHome" />

		<div v-loading="isFirstLoad"  class="warningData_box">
			<p style="text-align:center;" v-if="warningData.length==0">还没有报警数据。</p>
			<mt-loadmore 
				:autoFill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom" 
				:bottom-all-loaded="loadFinished" 
				ref="loadmore">
				<div v-for="(item,i) in warningData" :key="i" @click="$router.push('/warningHistory')" class="item">
					<!--设备名称-->
					<div class="equ_name_box" :itemId = "item.ID">
						<div style="float:left; height:100%; width:35px; ">
							<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
						</div>
						<div style="float:left; height:100%;">
							<p class="equ_name">{{item.ADDRESS}}</p>
							<span style="font-size:10px;">{{item.BOXSN}}</span>
						</div>
					</div>
					
					<div class="vertical_center pressure_item">
						<div style="width:100%;">
						<div style="display:flex;">
							<div style="flex:1; color:#F57272;">{{getAlarmType(item.ALARM_TYPE)}}</div>
							<div style="flex:1;">
								<div v-if="item.STATUS==0" style="color: #F57272;font-size: 13px;">未处理</div>
								<div v-if="item.STATUS==1" style="color: orange;font-size: 13px;">处理中</div>
								<div v-if="item.STATUS==2" style="color: green;font-size: 13px;">已处理</div>
							</div>
							<div style="flex:3;">{{item.ALARMDATE}}</div>
						</div>
						<div style="display:flex; padding-top:5px;">
							<div style="flex:1; font-size:12px;">报警时长：{{formatDuring(item.datetime)}}</div>
						</div>
						</div>
					</div>
				</div>
			
				<!--自定义拉取状态-->
			</mt-loadmore>
		</div>
		
		<!--列表显示区域-->
		
		
		
	</div>
	
</div>
</template>

<script>
import MyHeader from '@/components/xgjgas/Header.vue';

export default {
  name: 'warning',
  data() {
	return {
		warningData:[],  //报警数据
		currentPage:1,   //当前页
		pageCount:10,	//每页显示的数据量
		loadFinished:false , //是否将数据全部加载完毕
		isFirstLoad:true,
		keyWords:"",
	}
  },
  components:{
    MyHeader,
  },
  methods: {
	//上拉刷新
	loadTop() {
		//数据初始化
		this.currentPage = 1 ; 
		this.warningData = [] ; 
		this.loadFinished = false ; 
		this.getWarningData() ; 
		this.isFirstLoad = true,

		this.$refs.loadmore.onTopLoaded();
	},
	loadBottom() {
		//没拉取一次，当前页的数组增加一次
		this.currentPage = this.currentPage + 1 ; 
		console.log("当前页") ; 
		console.log(this.currentPage) ; 
		console.log("===============") ; 
		//加载数据
		this.getWarningData() ; 

		this.$refs.loadmore.onBottomLoaded();
	},

	searchFocus(obj){
		var $el = $(obj.currentTarget) ;
		$el.css("width","150px") ; 
	},
	  //获取子组件中的搜索关键字
	//获取子组件中的搜索关键字
    getKeywords:function(param){
        this.keyWords = param ;
    },
	getWarningData:function(){
		console.log("获取报警数据") ; 
		var _this = this ; 
		_this.$request({
			url:"/xgjHistoryAlarmInfo.list.do",
			method:"GET",
			params:{
				userId:localStorage.getItem("userId"),
				pagesize:_this.pageCount,
				startindex:_this.currentPage,
			}
		},res => {
			console.log(res) ; 
			_this.warningData = _this.warningData.concat(res.data.XgjEntityMsg) ; 
			_this.isFirstLoad = false ;

			//数据加载完毕
			if(res.data.XgjEntityMsg.length == 0){
				_this.loadFinished = true ; 
			}
			
			console.log("========================") ; 
		},err => {
			console.log("获取报警数据失败");
			console.log(err) ; 
		}) ; 
	},
	getAlarmType:function(type){
		switch(type){
			case 1:
				return "低压" ;
				brack ; 
			case 2:
				return "超压" ; 
				brack ; 
			case 3:
				return "电压" ; 
				brack ; 
			case 10:
				return "网络" ; 
				brack ;
		}
	},
	formatDuring(mss) {
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = (mss % (1000 * 60)) / 1000;
		return (
		days +
		" 天 " +
		hours +
		" 小时 " +
		minutes +
		" 分钟 " +
		seconds +
		" 秒 "
		);
	},
	
  },
  mounted() {
	  this.getWarningData() ;
  },
}
</script>


<style scoped>
#searchHere {
	width:50px; 
	height:30px; 
	border-radius:10px;

	-moz-transition: width 0.8s; /* Firefox 4 */
	-webkit-transition: width 0.8s; /* Safari 和 Chrome */
	-o-transition: width 0.8s; /* Opera */
}

  .item {
    padding-bottom:10px; 
	padding-left:15px; 
	padding-right:15px;
  }

  .equ_name_box {
    height:50px;  width:100%;
  }

  .pressure_item {
    height:60px; 
	border-bottom:2px solid #E3EAEF; 
	background-color:#F1F3FA;
	padding-left:5px;
  }

  .equ_name {
    margin-bottom:0; margin-top:5px; font-size:14px; font-weight:bold; color:#333333;
  }
  .col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }

  .warningData_box {
	  width:100%;  
	  height:100%;
	  padding-top:65px;
  }
</style>
