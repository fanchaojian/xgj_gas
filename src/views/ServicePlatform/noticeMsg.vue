<template>
    <div style="width:100%; height:100%; background-color:white;">>
        <!--头部区域-->
		<div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span @click="$router.push('/serviceHome')" style="color:#777;" class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-8 full_height" style="line-height:50px;">
				平台近期通知
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
                <!--任务列表，遍历体-->
                <div v-for="(msg,i) in noticeMsg" :id="msg.Id" :index="i" :key="msg.Id"   class="col-xs-12 splitLine" >
                    <div id="item" class="col-xs-12" style="padding:10px 0px;">
                        <div>
                            <h4 v-if="msg.pushType == '1'" style="color:#bbb;">抢单通知</h4>
                            <h4 v-if="msg.pushType == '2'" style="color:#bbb;">维修通知</h4>
                            <h4 v-if="msg.pushType == '3'" style="color:#bbb;">处罚通知</h4>
                            <h4 v-if="msg.pushType != '3' && msg.pushType != '2' && msg.pushType != '1'  " style="color:#bbb;">其它通知</h4>
                            <h6>{{msg.pushMsg}}</h6>
                            <p style="font-size:12px;">
                                <span>{{msg.createDate}}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div  v-if="noticeMsg.length == 0" style="text-align:center;">
                    <div>没有消息。</div>
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
            "margin-top":"35px",
            "padding":"0 15px",
            "height": window.screen.height-100+"px",
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
			
            //清空数据
            this.noticeMsg = [] ; 
			this.getNoticeMsg() ; 
			
			this.$refs.loadmore.onTopLoaded();
		},
        
        getNoticeMsg(){
            //启动加载动画
			this.loadFinished = false ;  
			this.loadingData = true ; 
            var _this = this ; 
            _this.$request({
                method: "get",
                url: "/xgjUser.getPushMsg.do?",
                params: {
                    userName: localStorage.getItem("userName"),
                },
                headers:{
                    Authorization: "Bearer "+localStorage.accessToken
                } 
            },res=>{
                console.log(res) ; 
                if(res.status == 200){
                    _this.noticeMsg = res.data.slice(0,40) ; 
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
		this.getNoticeMsg() ;
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
	
	.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12  {
		padding-left:0px;
		padding-right:0px;
	}
	
	.splitLine {
		border-bottom:2px solid #e0f0e9;
	}
</style>