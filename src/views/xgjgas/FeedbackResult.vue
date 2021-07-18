<!--反馈结果-->
<template>
  <div style="width:100%; height:100%;">
	<div style="width:100%; height:100%;">
		<!--头部区域-->
		<my-header pageName="反馈意见" doSearch="false"  backPath="/feedback" />
		
		<div style="width:100%; padding:85px 10px 30px 10px; ">
			<div style="width:100%; border:1px solid #ddd; border-radius:5px; box-shadow:0 0 5px 1px #ddd; padding:15px; 10px; background-color:#fff; text-align:center;">
				<h3 style="color:#727CF5;">已提交成功</h3>
				<h2>非常感谢您的意见</h2>
				<img style="width:100%;" src="@/assets/xgjgas/imgs/smile.png" />
				<button class="btn btn-default" @click="$router.push('/')">关闭</button>
			</div>

			
		</div>
		

	</div>
	
</div>
</template>

<script>
import MyHeader from '@/components/xgjgas/Header.vue';

export default {
  name: 'feedbackResult',
  data() {
	  return {
		  
	  }
  },
  components:{
    MyHeader,
  },
  methods: {
  },
  mounted() {

  },
}
</script>


<style scoped>
.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }
</style>
