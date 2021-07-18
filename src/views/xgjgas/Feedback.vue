<!--反馈信息-->
<template>
  <div style="width:100%; height:100%;">
	<div style="width:100%; height:100%;">
		<!--头部区域-->
		<!-- <div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:center;">
				<span @click="$router.push('/')" style="color:#777;" class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-8">
				<span style="font-size:16px;">反馈意见</span>
			</div>
			<div class="col-xs-2" align="right">
			</div>
		</div> -->

		<my-header pageName="反馈意见" doSearch="false"  backPath="/gasHome" />
		
		<div style="width:100%; padding:85px 10px 30px 10px; ">
			<div style="width:100%; border:1px solid #ddd; border-radius:5px; box-shadow:0 0 5px 1px #ddd; padding:15px; 10px; background-color:#fff;">
				<h3 style="margin-bottom:20px;">感谢您提出宝贵的意见！</h3>
				<textarea id="guestBook" class="form-control" rows="20"></textarea>
				<button @click="toResponse" style="width:100%; margin-top:30px;" type="button" class="btn btn-success btn-lg">提交</button>
			</div>
		</div>
	</div>
	
</div>
</template>

<script>
import MyHeader from '@/components/xgjgas/Header.vue';

export default {
  name: 'feedback',
  data() {
	  return {
		  
	  }
  },
  methods: {
	  toResponse:function(){
		  //此功能暂未开通，只有效果，更多功能请自行开发
		  var that = this ; 
		  var guestBook = $("#guestBook").val() ;
		  if(guestBook.trim().length == 0){
			  alert("请输入内容") ;
			  return false ;  
		  }
		  setTimeout(function(){
			that.$router.push('/feedbackResult')
		  },1500) ; 
	  }
  },
  components:{
    MyHeader,
  },
}
</script>


<style scoped>
.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }
</style>
