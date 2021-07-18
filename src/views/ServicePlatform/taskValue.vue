<template>
    <div style="width:100%; height:100%; background-color:white;">
       <!--头部区域-->
		<div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span  @click="$router.push('/serviceHome')" style="color:#777;"  class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-8 full_height" style="line-height:50px;">
				T值查看
			</div>
			<div class="col-xs-2"></div>
		</div>

		<mt-loadmore 
				:autoFill="false"
				:top-method="loadTop" 
				:bottom-all-loaded="loadFinished" 
				ref="loadmore">
            <!--数据框-->
            <div v-loading="loadingData"   :style="dataBox">
                <div style="overflow-y:scroll; width:100%; height:100%;">
                    <div>暂未开通此功能！</div>
                    
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
import MyHeader from '@/components/ServicePlatform/Header.vue';
import Moment from 'moment';
export default {
   name: "Allot",
   data() {
      return {
        loadFinished:true,  //数据加载是否加载完毕 mint-ui loadmore 
		loadingData:false ,  //处于加载状态，element 组件 v-loading
        dataBox:{
            "padding":"0 15px",
            "height": window.screen.height-80+"px",
        },
        noticeMsg:[],
      };
   },
   components:{
		MyHeader
    },
    methods:{
        loadTop() {
			//保持加载状态的动画
			this.loadFinished = false ;  
			this.loadingData = true ;  
			
			this.getNoticeMsg() ; 
			
			this.$refs.loadmore.onTopLoaded();
		},
        
        getNoticeMsg(){
            this.loadFinished = true ;  
			this.loadingData = false ; 
        },
    },
    filters:{
        dataformat:function(datastr,pattern=""){
            return Moment(datastr).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    mounted(){
		this.getNoticeMsg() ;
	}
};
</script>
<style lang="scss" scoped>
    #dataBox {
        overflow: hidden;
    }
    #header{
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

  .splitLine {
		border-bottom:2px solid #e0f0e9;
	}

    .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12  {
		padding-left:0px;
		padding-right:0px;
	}

    .doAcceptBtn { 
		border-radius:4px;
		font-size:12px;
    	font-weight:500;
    	padding-left:5px;
    	padding-right:5px;
		margin-left:15px;
		margin-right:15px;
		text-align:center ;
        background-color:#F0FFFF!important ;
		border:1px solid #00BFFF!important; 
		box-shadow:0 0 1px #00BFFF!important;
		color:#00BFFF!important ;
		cursor:pointer!important;
		height:40px
	}
	
	.doAcceptBtn span {
		line-height:40px;
	}

</style>