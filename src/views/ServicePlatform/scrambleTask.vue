<template>
    <div style="width:100%; height:100%; background-color:white;">
       <!--头部区域-->
		<div id="header" class="content_center">
			<div class="col-xs-2" style="vertical-align:centenr;">
				<span  @click="$router.push('/serviceHome')" style="color:#777;"  class="iconfont icon-left"></span>
			</div>
			<div class="col-xs-8 full_height" style="line-height:50px;">
				抢单
			</div>
			<div class="col-xs-2"></div>
		</div>

        <!--弹出框-->
        <div v-if="showPopover" style="position:absolute; width:100%; height:400px; top:200px; z-index:1000;  padding:0 30px;">
            <div class="common_shadow" style="border-radius:10px; width:100%; height:100%; padding:15px 30px; ">
                <p style="font-size:16px; font-weight:600;">{{focusTask.Name}}</p>
                <p style="font-size:12px;">{{focusTask.ActualLocation__c}}</p>
                <p style="font-size:14px; color:#bbb; font-weight:bold;">{{focusTask.RepairSubType__c}}</p>
                <p style="font-size:12px;">{{focusTask.AppointTime__c | dataformat}}</p>

                <hr />

                <div v-if="codeRunning" class="doAcceptBtn" @click="acceptTask(focusTask.Id)"><span>确认接单</span></div>

                <p v-if="! codeRunning" style="color:green;">正在执行。。。</p>
                <div class="col-xs-12" align="center" style="padding-top:100px;">
                    <img @click="showPopover=false;" src="@/assets/ServicePlatform/imgs/n.png" width="40px" height="40px" />
                </div>
            </div>
		</div>

		<mt-loadmore 
				:autoFill="false"
				:top-method="loadTop" 
				:bottom-all-loaded="loadFinished" 
				ref="loadmore">
            <!--数据框-->
            <div v-loading="loadingData"   id="dataBox" :style="dataBox">
                <div style="overflow-y:scroll; width:100%; height:100%;">
                    <!--任务列表，遍历体-->
                    <div v-for="(task,i) in uncreditedTask" :id="task.Id" :index="i" :key="task.Id"  @click="scrambleTask(task)" class="col-xs-12 splitLine" >
                        <div id="item" class="col-xs-12" style="padding:10px 0px;">
                            <div>
                                <p style="font-size:16px; ">{{task.Name}}</p> 
                                <p style="font-size:12px;">
                                    <span>{{task.ActualLocation__c}}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div  v-if="uncreditedTask.length == 0" style="text-align:center;">
                        <div>还没有抢单任务呢。</div>
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
        showPopover:false,
        codeRunning:true,
        loadFinished:true,  //数据加载是否加载完毕 mint-ui loadmore 
		loadingData:false ,  //处于加载状态，element 组件 v-loading
        dataBox:{
            "padding":"0 15px",
            "height": window.screen.height-80+"px",
        },
        focusTask:{
            Id:"",
            Name:"",
            ActualLocation__c:"",
            RepairSubType__c:"",
            AppointTime__c:"",

        },
        uncreditedTask:[],
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
			//加载巡检数据
			
            //清空数据
            this.uncreditedTask = [] ; 

			this.getUncreditedTask() ; 
			
			this.$refs.loadmore.onTopLoaded();
		},
        //执行抢单逻辑，弹出显示
        scrambleTask(task){
            this.focusTask = task
            this.showPopover = true ;

        },
        //获取抢单任务
        getUncreditedTask(){
            //启动加载动画
			this.loadFinished = false ;  
			this.loadingData = true ; 
            var _this = this ; 
            _this.$request_SF({
                method:"get",
				url:"/AcquireRepairTaskRest/getTask",
				headers:{
					Authorization:"Bearer "+localStorage.getItem("accessToken")
				}
            },res=>{
                console.log(res) ; 
                if(res.status == 200){
                    _this.uncreditedTask = res.data ; 
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
        //确认接单
        acceptTask(taskid){
            var _this = this ; 
            _this.codeRunning = false ; 
            _this.$request_SF({
                method:"post",
				url:"/AcquireRepairTaskRest/doPost",
                params:{
                    username:localStorage.getItem("userName"),
                    taskid:taskid
                },
				headers:{
					Authorization:"Bearer "+localStorage.getItem("accessToken")
				}
            },res=>{
                console.log(res) ; 
                if(res.data = true){
                    _this.$notify({
						title: '抢单提示',
						message: '抢单成功。',
						duration:1500,
						type: 'success'
					}); 
                }else{
                    _this.$notify({
						title: '抢单提示',
						message: '抢单失败。',
						duration:1500,
						type: 'info'
					}); 
                }

                //关闭窗口
                _this.showPopover = false ; 
                //重新加载数据
                _this.getUncreditedTask() ;
                
            },err=>{
                _this.$notify({
                    title: '',
                    message: '抢单程序出错，请联系管理员。',
                    duration:1500,
                    type: 'error'
                }); 
            }) ;
        },
    },
    filters:{
        dataformat:function(datastr,pattern=""){
            return Moment(datastr).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    mounted(){
		this.getUncreditedTask() ;
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