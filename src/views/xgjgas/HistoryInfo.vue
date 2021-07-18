<!--历史数据（所有调压器）-->
<template>
  <div style="width:100%; height:100%; ">
	<div style="width:100%; height:100%;">
		<!--头部区域-->
		<!-- <div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span @click="$router.push('/')" style="color:#777;" class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-10 full_height" style="line-height:50px;">
				<span style="line-height:inherit;">历史数据</span>
				<span id="search_icon" class="iconfont icon-search" style="float:right; line-height:inherit; color:#ccc; "></span>
				<span style="float:right; line-height:inherit;">
					<input @click="searchFocus($event)" id="searchHere" type="text" placeholder="搜索"/>
				</span>
			</div>
		</div> -->

		<my-header pageName="历史数据" doSearch="true" @func="getKeywords" backPath="/gasHome" />
		
		<div style="width:100%;  padding:70px 10px 0;">
			<div style="width:100%; height:100%; border:1px solid #eee; box-shadow:0 0 5px 1px #eee; background-color:#fff; border-radius:5px; padding:15px 10px;">
				<div @click="$router.push('/historyInfoDetails')" class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
                <div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
					</div>
				</div>
				<div class="item">
					<div style="float:left; height:100%; width:35px; ">
						<img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
					</div>
					<div style="float:left; height:100%;">
						<p class="equ_name">智能调压器-大兴路政01-出压</p>
						<span style="font-size:10px;">sy_box_noo5</span>
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
  name: 'historyInfo',
  data() {
	  return {
		  keyWords:""
	  }
  },
  components:{
    MyHeader,
  },
  methods: {
	  searchFocus(obj){
		var $el = $(obj.currentTarget) ;
		$el.css("width","150px") ; 
	  },
	  getKeywords:function(param){
		this.keyWords = param ; 
	  }
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
	padding:10px 0px; 
	height:50px; 
	box-sizing:content-box;
	border-bottom:2px solid #E3EAEF;
}

.equ_name {
	margin-bottom:0; margin-top:5px; font-size:14px; font-weight:bold; color:#333333;
}

.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }

</style>
