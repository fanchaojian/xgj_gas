<!--主页-->
<template>
    <div  style="width:100%; height:100%;">
        <div  @click.stop="hideMenu" id="face_content" style="width:100%; height:100%;">
            <!--头部区域-->
            <div id="header" class="content_center" >
                <div class="col-xs-3" style="vertical-align:center;">
                    <img id="user_icon" @click.stop="showMenu" src="@/assets/ServicePlatform/imgs/user_icon.png" height="35" width="35" style="border-radius:50%; border:1px solid #1296db;"/>
                </div>
                <div class="col-xs-6" style="text-align:center; color:#333; font-size:16px;">售后运营平台</div>
                <div class="col-xs-3" align="center">
                </div>
            </div>

            <!--地图显示区域-->
            <div id="map_container">
            </div>

            <!--列表统计区域-->
            <div id="footer" style="background-color:#F0FFF0;">
                <div class="col-xs-4" style="padding:5px; height:100%;">
                    <div @click="$router.push('/polling')" class="content_center footer_item_box" style="background-color:#fff;">
                        <span style="font-size:14px;">巡检</span><br />
                        <img src="@/assets/ServicePlatform/imgs/xunjian.png" height="15" width="15" />
                    </div>
                </div>
                <div class="col-xs-4" style="padding:5px; height:100%;">
                    <div @click="$router.push('/repair')" class="content_center footer_item_box" style="background-color:#fff;">
                        <span style="font-size:14px;">维修</span><br />
                        <img src="@/assets/ServicePlatform/imgs/weixiu.png" height="15" width="15"  />
                    </div>
                </div>
                <div class="col-xs-4" style="padding:5px; height:100%;">
                    <div @click="$router.push('/ventilation')" class="content_center footer_item_box" style="background-color:#fff;">
                        <span style="font-size:14px;">通气</span><br />
                        <img src="@/assets/ServicePlatform/imgs/tongqi.png" height="15" width="15"  />
                    </div>
                </div>
            </div>

            <!--拉取功能区域-->
            <transition name="my">
            <div v-show="equPull" id="fun_pull">
                <div class="full_box" id="equViewArea" style="background-color:#fff; border-radius:10px; padding:15px; font-size:12px; position:relative;">
                    <div style="width:100%; background-color:#F0FFF0; font-size:15px; margin-bottom:10px; text-align:center;">
                        <p style="padding:5px 0;">{{equBaseInfo.deviceName}}</p>
                    </div> 
                    <p>地址：{{equBaseInfo.deviceAddress}} 
                        <a style="padding-left:15px;" :href="toAmap(equBaseInfo)" >去这儿<a class="glyphicon glyphicon-send ds"></a> </a>
                    </p>
                    <p>编号：{{equBaseInfo.name}}</p>
                    <p>客户：{{equBaseInfo.customerName}}</p>
                    <p>联系人：{{equBaseInfo.siteContactName}}</p>
                    <p>联系人电话：{{equBaseInfo.siteContactTel}}</p>
                </div>

                <div id="closeBtn" @click="closeEquPull()" class="content_center item_sys_op" style="padding-bottom:5px;">
                    <span>关闭</span>
                </div> 
            </div>

            </transition>


        </div>
        
        <!--菜单栏区域-->
        <transition>
            <div id="menu" v-if="menuActive">
                <div style="width:100%; height:50px; padding:20px 0 40px 15px; box-sizing: content-box;">
                    
                    <!--菜单栏头像-->
                    <div  style="float:left; height:100%; width:50px;  border-radius:50%; border:1px solid #1296db; ">
                        <img src="@/assets/ServicePlatform/imgs/user_icon.png" width="100%" height="100%" style="border-radius:50%;"/>
                    </div>
                    
                    <div style="float:left; padding-left:10px; padding-top:5px;">
                        <p style="font-weight:bold; margin-bottom:0px;">{{$store.state.profile.name}}</p>
                        <p>{{$store.state.profile.phone}}</p>
                    </div>
                </div>
                
                <!--菜单功能区域-->
                <div class="fun_link">
                    <a @click="$router.push('signerEquipment')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/shebei.png" height="15" width="15" />
                        <span class="item" >我的设备</span>
                    </div>
                    </a>
                    <a @click="$router.push('polling')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/xunjian.png" height="15" width="15" />
                        <span class="item">巡检任务</span>
                    </div>
                    </a>
                    <a @click="$router.push('repair')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/weixiu.png" height="15" width="15" />
                        <span class="item">维修任务</span>
                    </div>
                    </a>
                    <a @click="$router.push('ventilation')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/tongqi.png" height="15" width="15" />
                        <span class="item">通气任务</span>
                    </div>
                    </a>
                    <a @click="$router.push('dispatchBill')" >
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/songhuo.png" height="15" width="15" />
                        <span class="item">送货任务</span>
                    </div>
                    </a>
                    <a>
                    <div @click="$router.push('scrambleTask')" class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/qiangdan.png" height="15" width="15" />
                        <span class="item">抢单</span>
                    </div>
                    </a>
                    <a @click="$router.push('taskValue')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/Tzhi.png" height="15" width="15" />
                        <span class="item">前一天T值</span>
                    </div> 
                    </a>
                    <!--<a @click="$router.push('punishMsg')" >
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/chufa.png" height="15" width="15" />
                        <span class="item">处罚信息</span>
                    </div>
                    </a> -->
                    <a @click="$router.push('noticeMsg')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/tongzhi.png" height="15" width="15" />
                        <span class="item">平台近期通知</span>
                    </div>
                    </a>
                    <a @click="logout" >
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/tuichu.png" height="15" width="15" />
                        <span class="item">退出登录</span>
                    </div>
                    </a>
                    <a @click="$router.push('gasHome')" >
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <img src="@/assets/ServicePlatform/imgs/zhineng.png" height="15" width="15" />
                        <span class="item">智能设备</span>
                    </div>
                    </a>
                </div>
                <!--考勤时间显示-->
                <div style="padding-left:10px; font-size:12px;">
                    <div class="col-xs-12" style="padding-top:30px; border-bottom:1px solid #ccc;">
                        <div class="col-xs-8" align="left"><span style="line-height:20px; font-size:14px;">考勤</span></div>
                        <div class="col-xs-4" align="right">
                            <img  @click="getAttendanceData" width="20px" height="20px" src="@/assets/ServicePlatform/imgs/refresh.png" />
                        </div>
                    </div>
                    <div>
                        <span style="line-height:25px;">签到：{{startDate | dataformat}}</span>	
                    </div>

                    <div>
                        <span style="line-height:25px;">签退：{{endDate | dataformat}}</span>	
                    </div>
                    
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Moment from 'moment';

const vm = {
    name: 'serviceHome',
    data() {
        return {
            api:this.$store.state.api,
            map:null,
            menuActive:false ,
            equPull:false,
            equBaseInfo:{
                lnglat:"0.0,0.0",
                //设备名称
                deviceName:'',
                //设备地址
                deviceAddress:'',  
                //设备编号
                name:'',
                //客户
                customerName:'' ,
                //联系人
                siteContactName:'',
                //联系人电话
                siteContactTel:''
            },
            equipments:[],
            startDate:"",  //考勤签到时间
			endDate:""     //考勤结束时间
        }
    },
    methods: {
        showMenu:function(){
            this.menuActive = true ; 
        },
        hideMenu:function(){
            this.menuActive = false ; 
        },
        //获取当前的位置信息
        getPosition:function(){
            var that = this ; 
            AMap.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：5s
                    buttonPosition:'RT',    //定位按钮的停靠位置
                    buttonOffset: new AMap.Pixel(10, 65),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: false,   //定位成功后是否自动调整地图视野到定位点

                });
                that.map.addControl(geolocation);
                geolocation.getCurrentPosition(function(status,result){
                    if(status=='complete'){
                        onComplete(result)
                    }else{
                        onError(result)
                    }
                });
            });
            //解析定位结果
            function onComplete(data) {
                console.log("定位成功") ; 
            }
            //解析定位错误信息
            function onError(data) {
                console.log("定位失败") ; 
            }
        },
        //获取所有的调压箱
        getEquipments:function(){
            //默认查询999个箱子
            this.$request_SF({
                method:"get",
                url:"/RunningTaskEquRest/getUserInfo",
                params:{
                    username:'zhaoaibo@xgjgas.com' ,
                },
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("accessToken")
                }
            },res => {
                console.log("access token:"+localStorage.getItem("accessToken")) ; 
                console.log(res) ; 
                if(res.status="200"){
                    this.equipments = res.data ;  
                    //创建marker
                    this.createEquMarker() ; 
                }else{
                    console.log("获取调压箱数据失败："+res.data.message) ; 
                } 
            },err => {   //失败时的回调
				console.log("请求失败") ;
                console.log(err) ;   
			})
        },
        //创建调压箱marker
        createEquMarker:function(){ 
            var _this=this;
            var equ = _this.equipments ; 
            //遍历设备列表，添加marker
            for(var i=0; i<equ.length; i++){
                var lnglat = '' ; 
                if('LongitudeAndLatitude__c' in equ[i]){
                    lnglat = equ[i].LongitudeAndLatitude__c ; 
                }else{
                    lnglat = '0.0,0.0' ; 
                }
                

                var lng = lnglat.split(/,|，/)[0]; 
                var lat = lnglat.split(/,|，/)[1] ; //AMap.LngLat
                var marker = new AMap.Marker({
                    icon:new AMap.Icon({
                        imageSize:new AMap.Size(36,36),
                        image:"https://cloud.yunpuhuaxing.com/upload/equ.png"
                    }),
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-18, -18),
                    extData:{
                        //经纬度
                        lnglat:lnglat,
                        //设备名称
                        deviceName:'DeviceName__c' in equ[i] ? equ[i].DeviceName__c : '',
                        //设备地址
                        deviceAddress:'DeviceAddress__c' in equ[i] ? equ[i].DeviceAddress__c : '',  
                        //设备编号
                        name:equ[i].Name,
                        //客户
                        customerName:'Customer__r' in equ[i] ? equ[i].Customer__r.Name : '' ,
                        //联系人
                        siteContactName:'siteContactName__c' in equ[i] ? equ[i].siteContactName__c : '',
                        //联系人电话
                        siteContactTel:'siteContactTel__c' in equ[i] ? equ[i].siteContactTel__c : ''
                    }

                });
                marker.setMap(_this.map);
                
                marker.on("click",function(event){
                    _this.equPull = true ; 
                    var exeData = event.target.getExtData() ; 
                    console.log(exeData) ; 
                    //从屏幕底部拉取设备相关信息
                    _this.equBaseInfo =  exeData ;
                }) ; 
            }
        },
        //================================================================
		//获取profile
		getProfile:function(){
			console.log("获取profile") ; 
			var _this =this ; 
            _this.$request({
                method: "post",
                url:"/xgjUserInfo.getInfo.do",
				params: {
					fUserId:localStorage.getItem("userId"),
				}
            },res=>{
                console.log("获取用户信息成功。") ; 
                if(res.data.code == 1){
					//保存数据到store
					_this.$store.commit('setBaseInfo',res.data.content[0]) ; 
				}else{
					alert(res.data.msg) ; 
				}
            },err=>{
                console.log("获取用户信息失败") ; 
            })
		},
        //退出登录
        logout:function(){
            //清空登录信息，userId,username,password
            localStorage.removeItem("userId")  ;
            localStorage.removeItem("userName")  ;
            localStorage.removeItem("password")  ;
            localStorage.removeItem("userRole") ;
            localStorage.removeItem("accessToken") ; 
            this.$router.push("/login") ; 

        },
        //导航,打开高德地图导航
		toAmap(equBaseInfo){
            var lnglat = equBaseInfo.lnglat ; 
            var address = equBaseInfo.deviceAddress ; 
			if(lnglat != '0.0,0.0'){
				var lng = lnglat.split(/,|，/)[0] ;
				var lat = lnglat.split(/,|，/)[1] ;

                //安卓端导航
				var myHref = "androidamap://viewMap?sourceApplication=appname&poiname="+address+"&lat="+lat+"&lon="+lng+"&dev=0";
                //苹果端导航
				// var myHref = "iosamap://viewMap?sourceApplication=applicationName&poiname="+address+"&lat="+lat+"&lon="+lng+"&dev=1";
				return myHref ; 
			}else{
				return "#" ; 
			}
		},
        //关闭拉取菜单
        closeEquPull(){
            this.equPull = false ; 
            this.equBaseInfo = {
                lnglat:"0.0,0.0",
                //设备名称
                deviceName:'',
                //设备地址
                deviceAddress:'',  
                //设备编号
                name:'',
                //客户
                customerName:'' ,
                //联系人
                siteContactName:'',
                //联系人电话
                siteContactTel:''
            }
        },
        //获取考勤数据
		getAttendanceData(){
			var _this = this ; 
            _this.$request_SF({
                method: "get",
				url: "/PlatformAttendanceDataRest/doGet?",
				params:{
					username: localStorage.getItem("userName"),
				},
				headers:{
					Authorization: "Bearer " + localStorage.accessToken,
				}
            },res=>{
                if(res.data.length != 0){
					_this.startDate = 'startDate__c' in res.data ? res.data.startDate__c:"" ;
					_this.endDate = 'endDate__c' in res.data ? res.data.endDate__c:"" ;
				}
            },err=>{
                
            }) ;
		}
    },
    filters:{
        dataformat:function(datastr,pattern=""){
			if(datastr == ""){
				return "" ; 
			}
			return Moment(datastr).format('YYYY-MM-DD HH:mm:ss')
		}
    },
    mounted() {
        this.map = new AMap.Map('map_container', {
            resizeEnable: true,
            zoom:8, //初始化地图层级
        });

        //获取profile
        this.getProfile() ; 
        
        //获取位置信息
        this.getPosition() ; 
        //获取所有的设备列表
        this.getEquipments() ; 

        //获取考勤数据
        this.getAttendanceData() ;
    },
    created() {
        
    },
}

export default vm ; 
</script>

<style scoped>
    #map_container {
        width: 100%;
        height: 100%;
    }
   
    #header{
		position:fixed;
		width:inherit;
		height:55px;;
		background-color:#fff;
		top:0px;
		z-index:100;
		padding-left:15px;
		padding-right:15px;
		z-index: 100;
	}

    #footer {
        position:fixed;
        height:100px;
        width:inherit;
        background-color:#fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding:10px;
        bottom: 0;
        z-index: 200;
    }

    .footer_item_box {
        height:100%; 
        height:100%; 
        border:1px solid #eee; 
        box-shadow:0 0 5px 1px #eee; 
        border-radius: 5px;
        text-align:center;
    }

    #fun_pull{
        position:fixed;
        height:auto;
        width:inherit;
        background-color: #efefef;
        bottom:0;
        z-index:210;
    }

    #fun_pull .equ_item{
        height:65px; width:100%; background-color:#fff; border:1px solid #ddd; border-radius:10px; margin-top:5px; padding:5px 15px;
    }

    .equ_item{
        height:65px; width:100%; background-color:#fff; border:1px solid #ddd; border-radius:10px; margin-top:5px; padding:5px 15px;
    }

    #fun_pull .item_sys_op {
        height:50px; width:100%; background-color:#fff; border-radius:10px; margin-top:10px;
    }

    #menu{
        position:fixed ; 
        height:100%;
        width:65%;
        border-right:1px solid #efefef;
        background-color:#fff;
        box-shadow:0 0 2px 1px #efefef;
        top:0;
        bottom:0;
        left:0;
        z-index:250;
        padding:20px;
    }

    
    .fun_link a:hover {
        cursor:pointer ;
    }

    .item {
        color: #313450; 
        line-height: 40px; 
        padding-left:10px;  
        font-size:12px;
    }

    .itemLine {
        border-bottom: 1px solid #f0f0f0;
    }

    .icon {
        font-size:12px; size:12px;
        font-weight:bold;
    }

    .v-enter,
	.v-leave-to{
		opacity:0 ;
		transform:translateX(-100px);
	}
	/*v-enter-active:入场动画时间段*/
	/*v-leave-active：离场动画时间段*/
	.v-enter-active,
	.v-leave-active{
		transition:all 0.4s ease;
	}

    .my-enter,
	.my-leave-to{
		opacity:0;
		transform:translateY(80px) ;
	}
	
	.my-enter-active,
	.my-leave-active{
		transition:all 0.4s ease;
	}

     .col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }
</style>
