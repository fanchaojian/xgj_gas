<!--指定设备各项指标数据-->
<template>
<div style="width:100%; height:100%;">
	<div style="width:100%; height:100%;">
		<!--头部区域-->
		<my-header pageName="调压箱列表" doSearch="false"  backPath="/equipment" />
		
		<div style="width:100%; padding:70px 10px 20px 10px; ">
			<!--列表显示区域-->
			<div class="item">
				<!--设备名称-->
				<div class="equ_name_box">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-进压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
					<div style="float:right;">
						<img src="@/assets/xgjgas/imgs/toMap.png" height="30" width="30" />
					</div>
				</div>
				<div style="height:90px; width:100%;">
					<!--压力采集仪数据显示-->
					<div id="equ_pressure" v-show="equType==0?true:false" style="height:100%; width:100%;">
						<div style="height:100%; padding:2px;" class="col-xs-4">
							<div id="pressure" dataitem="pressure" @click="toggleDataItem($event)" class="content_center item_data_box item_data_active">
								<img src="@/assets/xgjgas/imgs/yali-1.png" height="20px" width="20px" /><br />
								<span class="font_small">压力</span><br />
								<span style="font-size:14px; font-weight:bold; ">100.99</span><br />
								<span class="font_small">kpa</span><br />
							</div>
						</div>
						<div style="height:100%; padding:2px;" class="col-xs-4">
							<div dataitem="temperature" @click="toggleDataItem($event)" class="content_center item_data_box">
								<img src="@/assets/xgjgas/imgs/wendu-1.png" height="20px" width="20px" /><br />
								<span class="font_small">温度</span><br />
								<span style="font-size:14px; font-weight:bold;">32.8</span><br />
								<span class="font_small"></span>℃<br />
							</div>
						</div>
						<div style="height:100%; padding:2px;" class="col-xs-4">
							<div class="content_center item_data_box">
								<img src="@/assets/xgjgas/imgs/dianliang-1.png" height="20px" width="20px" /><br />
								<span class="font_small">电压</span><br />
								<span style="font-size:14px; font-weight:bold;">3.9</span><br />
								<span class="font_small">V</span><br />
							</div>
						</div>
					</div>
					
				    <!--流量计数据显示-->
					<div id="equ_flow" v-show="equType==0?false:true" style="height:100%; padding:2px;" class="col-xs-4">
						<div class="content_center item_data_box" style="background-color:#F1F3FA;">
							<img src="@/assets/xgjgas/imgs/liulianji-1.png" height="20px" width="20px" /><br />
							<span class="font_small">流量</span><br />
							<span style="font-size:14px; font-weight:bold;">3.9</span><br />
							<span class="font_small">m³/h</span><br />
						</div>
					</div>
				</div>
				<div style="width:100%; margin-top:5px;">
					<span style="line-height:25px; font-size:10px; padding-left:5px; color:#777;">更新时间：2020-07-01 12:00：00</span>
				</div>
			</div>
			
			<div v-if="pressureChartBox">
				<!--压力 图表显示区域-->
				<div v-show="pressureChart" style="text-align:center;">
					<ul class="nav nav-tabs" style="margin:0 0 20px;">
						<li id="pre_biaozhitu" role="biaozhitu" @click="toggleTag($event)" class="chart active"><a>表纸图</a></li>
						<li id="pre_quxiantu" role="quxiantu" @click="toggleTag($event) " class="chart"><a>曲线图</a></li>
					</ul>
					<!--压力表纸图-->
					<div v-show="biaozhitu" style="width:100%; ">
						<div class="width: 100%; height: 350px; margin: 0 auto;">
							<ClockChart @setPreApex = "setPreApex"></ClockChart>
						</div>
					</div>
					<!--压力折线图-->
					<div v-show="!biaozhitu" style="width:100%;">
						<!--<img src="@/assets/xgjgas/imgs/quxiantu.png" height="350px" width="350px" />  -->
						<LineChart></LineChart>
					</div>

					<div style="width:100%; height:50px;">
						<div class="col-xs-6 full_height" style="padding-right:4px;">
							<div class="full_box" style="background-color:#727CF5; border-radius:5px;">
								<div class="col-xs-4 content_center full_height" align="center">
									<img src="@/assets/xgjgas/imgs/yali-3.png" width="25px" height="25px"/><br />
									<span class="pressure_measure">最大值</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span style="font-size:16px; color:#fff;">{{paressureRelated.maxV}}</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span class="font_white">kpa</span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 full_height" style="padding-left:4px;">
							<div class="full_box" style="background-color:#727CF5; border-radius:5px;">
								<div class="col-xs-4 content_center full_height" align="center">
									<img src="@/assets/xgjgas/imgs/yali-3.png" width="25px" height="25px"/><br />
									<span class="pressure_measure">最小值</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span style="font-size:16px; color:#fff;">{{paressureRelated.minV}}</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span class="font_white">kpa</span>
								</div>
							</div>
						</div>
					</div>
				</div>


				<!--温度 图表显示区域-->
				<div v-show="!pressureChart" style="text-align:center;">
					<div style="width:100%; height:42px; margin:0 0 20px;">
						<div class="content_center" style="width:50%; height:100%; float:left; background-color:#F1F3FA; border-radius:4px 4px 0px; border:0.8px solid #ddd; border-bottom:0;">
							曲线图
						</div>
						<div style="width:50%; height:100%; float:left;  border-bottom:0.8px solid #ddd"></div>
					</div>
					<div id="quxiantu_wendu" style="width:100%;">
						<!--============================-->
						<LineChart2 @setTempApex="setTempApex"></LineChart2>
						<!--============================-->

						<div class="full_width" style="height:50px;">
							<div class="col-xs-6 full_height" style=" padding-right:4px;">
								<div class="full_box" style="background-color:#727CF5; border-radius:5px;">
									<div class="col-xs-4 content_center full_height" align="center">
										<img src="@/assets/xgjgas/imgs/wendu-3.png" width="25px" height="25px"/><br />
										<span class="pressure_measure">最大值</span>
									</div>
									<div class="col-xs-4 content_center full_height">
										<span style="font-size:16px; color:#fff;">{{temperatureRelated.maxT}}</span>
									</div>
									<div class="col-xs-4 content_center full_height">
										<span class="font_white">V</span>
									</div>
								</div>
							</div>
							<div class="col-xs-6 full_height" style="padding-left:4px;">
								<div class="full_box" style="background-color:#727CF5; border-radius:5px;">
									<div class="col-xs-4 content_center full_height" align="center">
										<img src="@/assets/xgjgas/imgs/wendu-3.png" width="25px" height="25px"/><br />
										<span class="pressure_measure">最小值</span>
									</div>
									<div class="col-xs-4 content_center full_height">
										<span style="font-size:16px; color:#fff;">{{temperatureRelated.minT}}</span>
									</div>
									<div class="col-xs-4 content_center full_height">
										<span class="font_white">V</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--流量计 数据显示区域-->
			<div v-if="flowDataBox" style="text-align:center;">
				<div style="width:100%; height:42px; margin:0 0 20px;">
					<div class="content_center" style="width:50%; height:100%; float:left; background-color:#F1F3FA; border-radius:4px 4px 0px; border:0.8px solid #ddd; border-bottom:0;">
						曲线图
					</div>
					<div style="width:50%; height:100%; float:left;  border-bottom:0.8px solid #ddd"></div>
				</div>
				<div id="quxiantu_wendu" style="width:100%;">
					<!--============================-->
					<LineChart3 @setFlowApex="setFlowApex"></LineChart3>
					<!--============================-->

					<div class="full_width" style="height:50px; ">
						<div class="col-xs-6 full_height" style=" padding-right:4px;">
							<div class="full_box" style="background-color:#727CF5; border-radius:5px;">
								<div class="col-xs-4 content_center full_height" align="center">
									<img src="@/assets/xgjgas/imgs/liulianji-3.png" width="25px" height="25px"/><br />
									<span class="pressure_measure">最大值</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span style="font-size:16px; color:#fff;">{{flowRelated.maxF}}</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span class="font_white">m³/h</span>
								</div>
							</div>
						</div>
						<div class="col-xs-6 full_height" style="padding-left:4px;">
							<div class="full_box" style="background-color:#727CF5; border-radius:5px;">
								<div class="col-xs-4 content_center full_height" align="center">
									<img src="@/assets/xgjgas/imgs/liulianji-3.png" width="25px" height="25px"/><br />
									<span class="pressure_measure">最小值</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span style="font-size:16px; color:#fff;">{{flowRelated.minF}}</span>
								</div>
								<div class="col-xs-4 content_center full_height">
									<span class="font_white">m³/h</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="content_center extra_link" style=" margin-top:30px;">
				<span>历史运行数据</span>
			</div>
			
			<div class="content_center extra_link" style="margin-top:10px; background-color:#F1F3FA; color:#333;">
				<span>历史报警数据</span>
			</div>
			
		</div>
	</div>
</div>
</template>

<script>
import MyHeader from '@/components/xgjgas/Header.vue';
import ClockChart from '@/components/xgjgas/ClockChart.vue'
import LineChart from '@/components/xgjgas/LineChart.vue'
import LineChart2 from '@/components/xgjgas/LineChart2.vue'
import LineChart3 from '@/components/xgjgas/LineChart3.vue'

export default {
  name: 'equipmentDetails',
  data() {
	  return { 
		equId:"",  //设备id
		equType: 0 , //设备类型，0：压力采集仪，1：流量计
		pressureChart:true , 
		pressureChartBox:false,
		flowDataBox:false ,
		biaozhitu:true,
		YstartTime: new Date().DateToString(),
		YendTime: new Date().AddDays(+1).DateToString(),
		FstartTime: new Date().AddDays(-1).DateToString(),
		FendTime: new Date().AddDays(+1).DateToString(),
		paressureRelated:{
			maxV:0,
			minV:0,
		},
		temperatureRelated:{
			maxT:0,
			minT:0,
		},
		flowRelated:{
			maxF:0,
			minF:0,
		}
	  }
  },
  components:{
    MyHeader,
	ClockChart,
	LineChart,
	LineChart2,
	LineChart3
  },
  computed:{
      //流量
      LdataUrl() {
        return "/xgjSquareFigure.gatherdata.do?gatherSn="+this.sn+
		 		"&beginTime="+this.YstartTime+
				"&endTime="+this.YendTime+
				"&dataType=3";
      },
  },
  methods: {
	//压力图标显示和温度图标显示的切换
	toggleDataItem:function(obj){
		var $el = $(obj.currentTarget) ;
		$(".item_data_box").removeClass("item_data_active") ; 
		$el.addClass("item_data_active"); 
		if($el.attr("dataitem") == "pressure"){
			this.pressureChart = true ; 
			//获取压力数据
			//this.getPressureData() ; 
		}else{
			this.pressureChart = false ;  
		}
	},
	  //表纸图和曲线图的切换
	toggleTag:function(obj){
		var $this = $(obj.currentTarget) ;
		$(".chart").removeClass("active") ; 
		$this.addClass("active") ;
		if($this.attr("role") == "biaozhitu"){
			this.biaozhitu = true ; 
		}else{
			this.biaozhitu = false ; 
		}
	},
	//添加或设置页面必要的参数，如sn,equId,equType 
	initData:function(){
		var _this = this ; 
		if("sn" in _this.$route.query){
			_this.equId = _this.$route.query.equid ; 
			_this.equType = _this.$route.query.equType ; 
			console.log("有值") ;
			var equInfo = {
				sn:_this.$route.query.sn ,
				equid:_this.$route.query.equid,
				equType:_this.$route.query.equType
			}
			
			_this.$store.commit('setEquInfo',equInfo) ;
		}
	},
	//设置压力、温度、流量的最大值和最小值，通过子组件调用
	setPreApex(maxV,minV){
		this.paressureRelated.maxV = maxV ; 
		this.paressureRelated.minV = minV ; 
	},
	setTempApex(maxT,minT){
		this.temperatureRelated.maxT = maxT ; 
		this.temperatureRelated.minT = minT ; 
	},
	setFlowApex(maxF,minF){
		this.flowRelated.maxF = maxF ; 
		this.flowRelated.minF = minF ; 
	}
	
  },
  created() {
	  this.initData() ;
  },
  beforeMount(){
	  
  },
  mounted() {
	//判断设备类型，$store.state.equInfo.equType
	  					//0:压力采集仪（默认）
					    //1:流量计
	if(this.$store.state.equInfo.equType == "0"){
		this.pressureChartBox = true ; 
		this.flowDataBox = false ; 
	}else{
		this.pressureChartBox = false ; 
		this.flowDataBox = true ; 
	}
  },
}
</script>


<style scoped>
.item {
	height:180px;
	width:100%;
	border:1px solid #ddd;
	padding:5px 10px;
	border-radius:5px;
	background-color:#fff;
	margin-bottom:15px;
}

.equ_name_box {
	height:50px;  width:100%;
}

.pressure_item {
	height:50px; border-bottom:2px solid #E3EAEF; background-color:#F1F3FA;
}

.equ_name {
	margin-bottom:0; margin-top:5px; font-size:14px; font-weight:bold; color:#333333;
}

.item_data_box {
	width:100%; height:100%; border:1px solid #ddd;
	text-align:center;
	border-radius:4px;
}

.item_data_active {
	background-color:#F1F3FA;
}

.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }

.nav li {
	width:50%;
	text-align:center;
}

.nav-tabs>li.active>a {
	background-color: #F1F3FA;
}

.font_small {
	font-size:8px;
}

.font_small_white {
	font-size:8px;
	color:#fff;
}

.font_white {
	color:#fff;
}

.extra_link {
	width:100%; height:40px; background-color:#727CF5; border-radius:4px; color:#fff;
}
.pressure_measure {
	color:#fff; font-size:10px; vertical-align: text-bottom;
}

</style>
