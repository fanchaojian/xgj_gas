<template>
    <div style="width:100%; height:100%; background-color:white;">
       <!--头部区域-->
		<div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span  @click="$router.push('/serviceHome')" style="color:#777;"  class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-8 full_height" style="line-height:50px;">
				处罚信息
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
                    <!--任务列表，遍历体-->
                    <div v-for="(msg,i) in punishMsg" :id="msg.Id" :index="i" :key="msg.Id"   class="col-xs-12 splitLine" >
                        <div id="item" class="col-xs-12" style="padding:10px 0px;">
                            <div>
                                <p style="font-size:16px; ">{{msg.RecordValue__c}}</p> 
                                <p style="font-size:12px;">
                                    <span>{{msg.Remark__c}}</span>
                                </p>
                                <p style="font-size:12px;">
                                    <span>时间：{{msg.Date__c | dataformat}}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div  v-if="punishMsg.length == 0" style="text-align:center;">
                        <div>没有消息。</div>
                    </div>
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
        punishMsg:[],
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
            
            //清空数据
            this.punishMsg = [] ; 
			
			this.getPunishMsg() ; 
			
			this.$refs.loadmore.onTopLoaded();
		},
        
        //获取处罚消息数据
        getPunishMsg(){
            //启动加载动画
			this.loadFinished = false ;  
			this.loadingData = true ; 
            var _this = this ; 
            _this.$request_SF({
                method:"get",
				url:"/RewardAndPunishRest/getRecord",
                params:{
					username:localStorage.getItem("userName"),
				},
				headers:{
					Authorization:"Bearer "+localStorage.getItem("accessToken")
				}
            },res=>{
                console.log(res) ; 
                if(res.status == 200){
                    _this.punishMsg = res.data ; 
                }
                //加载动画停止
                this.loadFinished = true ;  
                this.loadingData = false ;  
            },err=>{
                _this.$notify({
                    title: '',
                    message: '获取抢单任务程序出错。',
                    duration:1500,
                    type: 'error'
                }); 
                //加载动画停止
                this.loadFinished = true ;  
                this.loadingData = false ;  
            }) ; 
        },
    },
    filters:{
        dataformat:function(datastr,pattern=""){
            return Moment(datastr).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    mounted(){
		this.getPunishMsg() ;
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