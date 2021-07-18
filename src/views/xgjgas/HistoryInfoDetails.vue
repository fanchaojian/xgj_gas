<!--指定设备各项指标历史记录-->
<template>
<div  style="width:100%; ">
	<div style="width:100%; ">
		<!--头部区域-->
		<my-header pageName="历史数据" doSearch="false"  backPath="/historyInfo" />
		
		<!--报警记录列表，外部盒子-->
		<div style="width:100%; height:100%; padding:70px 10px 0px;">
			<!--内容盒子-->
			<div style="width:100%; height:100%; border:1px solid #ddd; box-shadow:0 0 10px 1px #ddd; border-radius:5px; background-color:#fff; position:relative;">
				<!--上部固定,182px-->
				<div style="width:100%; height:182px; position:absolute; top:-1px; padding:5px; background-color:#fff; z-index:1000; border-radius:8px;">
					<!--设备信息-->
					<div style="height:50px;  width:100%;">
						<div style="float:left; height:100%; width:40px; ">
							<img src="@/assets/xgjgas/imgs/yali-2.png" width="35" height="35" style="margin-top:5px;"/>
						</div>
						<div style="float:left; height:100%;">
							<p style="margin-bottom:0; margin-top:5px; font-size:14px; font-weight:bold; color:#333333;">智能调压器-大兴路政01-出压</p>
							<span style="font-size:10px;">sy_box_noo5</span>
						</div>
					</div>
					
					<!--时间段查询-->
					<div class="content_center"  style="height:35px; width:100%; margin-top:15px;">
						<div class="col-xs-6" style="height:100%; padding:0 2px 0 0;">
							<div class="content_center" style="background-color:#F1F3FA; height:100%; width:100%;">开始时间</div>
						</div>
						<div class="col-xs-6" style="height:100%; padding:0 0px 0 2px;">
							<div class="content_center" style="background-color:#F1F3FA;height:100%; width:100%;">结束时间</div>
						</div>
					</div>
					<!--分割线-->
					<hr class="split_line"/>
					
					<div style="height:50px;">
						<div class="col-xs-2 content_center" style="height:100%;">DTU</div>
						<div class="col-xs-2 content_center" style="height:100%;">温度</div>
						<div class="col-xs-3 content_center" style="height:100%;">压力</div>
						<div class="col-xs-2 content_center" style="height:100%;">电压</div>
						<div class="col-xs-3 content_center" style="height:100%;">时间</div>
					</div>
				</div>
				
				<!--报警压力表格-->
				<div style="width:100%; height:100%; padding:182px 5px 0px; overflow-y:scroll; background-color:#fff; z-index:0; border-radius:8px;">
					<!--tbody -->
					<div style="height:50px; border-bottom:2px solid #E3EAEF; background-color:#F1F3FA;">
						<div class="col-xs-2 content_center" style="height:100%;">DTU</div>
						<div class="col-xs-2 content_center" style="height:100%;">30(℃)</div>
						<div class="col-xs-3 content_center" style="height:100%;">99.9kpa</div>
						<div class="col-xs-2 content_center" style="height:100%;">3.9v</div>
						<div class="col-xs-3 content_center" style="height:100%;">2020/07/01 20:00:00</div>
					</div>
					<div style="height:50px;">
						<div class="col-xs-2 content_center" style="height:100%;">DTU</div>
						<div class="col-xs-2 content_center" style="height:100%;">30</div>
						<div class="col-xs-3 content_center" style="height:100%;">99.9kpa</div>
						<div class="col-xs-2 content_center" style="height:100%;">3.9v</div>
						<div class="col-xs-3 content_center" style="height:100%;">2020/07/01 20:00:00</div>
					</div>
					
				</div>
			</div>
		</div>
		
		
	</div>
	
</div>
</template>

<script>
import MyHeader from '@/components/xgjgas/Header.vue';

export default {
  name: 'historyInfoDetails',
  data() {
	  return {
		  
	  }
  },
  components:{
    MyHeader,
  },
  methods: {
	  searchFocus(obj){
		var $el = $(obj.currentTarget) ;
		$el.css("width","150px") ; 
	  }
  },
}
</script>


<style scoped>
.split_line {
	margin-top:15px; background-color:#E3EAEF; height:1px; margin-bottom:0;
}

.pressure_name {
	color:#F57272;
}

.pressure_data {
	color:#5D5D5D;
}

.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }
</style>
