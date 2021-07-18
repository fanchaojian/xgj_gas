<!--主页-->
<template>
    <div  style="width:100%; height:100%;">
        <div  @click.stop="hideMenu" id="face_content" style="width:100%; height:100%;">
            <!--头部区域-->
            <div id="header" class="content_center">
                <div class="col-xs-3" style="vertical-align:center;">
                    <img id="user_icon" @click.stop="showMenu" src="@/assets/xgjgas/imgs/user_icon3.png" height="35" width="35" style="border-radius:50%;"/>
                </div>
                <div class="col-xs-6" style="text-align:center; color:#333; font-size:16px;">智能燃气平台</div>
                <div class="col-xs-3" align="center">
                </div>
            </div>

            <!--地图显示区域-->
            <div id="map_container">
            </div>

            <!--列表统计区域-->
            <div id="footer">
                <div class="col-xs-6" style="padding:5px; height:100%;">
                    <div class="content_center footer_item_box" style="background-color:#F0FFF0;">
                        <span style="font-size:16px;">已监控设备</span><br />
                        <span>10</span>
                    </div>
                </div>
                <div class="col-xs-6" style="padding:5px; height:100%;">
                    <div class="content_center footer_item_box" style="background-color:#FFF5EE;">
                        <span style="font-size:16px;">异常设备</span><br />
                        <span>0</span>
                    </div>
                </div>
            </div>

            <!--拉取功能区域-->
            <transition name="my">
            <div v-show="equPull" id="fun_pull">
                <!--<div class="equ_item">
                    <div style="height:100%; width:55px; float:left; padding:5px;">
                        <img src="@/assets/xgjgas/imgs/yali-2.png" height="100%" width="100%"/>
                    </div>

                    <div style="height:100%; float:left; padding:5px 0 0 15px;">
                        <span style="font-size:16px;">智能调压器-大兴路政01-出压</span><br />
                        <span style="font-size:10px;">sy_box_n005</span>
                    </div>
                </div>
                <div class="equ_item">
                    <div style="height:100%; width:55px; float:left; padding:5px;">
                        <img src="@/assets/xgjgas/imgs/yali-2.png" height="100%" width="100%"/>
                    </div>

                    <div style="height:100%; float:left; padding:5px 0 0 15px;">
                        <span style="font-size:16px;">智能调压器-大兴路政01-出压</span><br />
                        <span style="font-size:10px;">sy_box_n005</span>
                    </div>
                </div>
                <div class="equ_item">
                    <div style="height:100%; width:55px; float:left; padding:5px;">
                        <img src="@/assets/xgjgas/imgs/liulianji-2.png" height="100%" width="100%"/>
                    </div>

                    <div style="height:100%; float:left; padding:5px 0 0 15px;">
                        <span style="font-size:16px;">智能调压器-大兴路政01-流量</span><br />
                        <span style="font-size:10px;">sy_box_n005</span>
                    </div>
                </div>
                

                <div class="content_center item_sys_op">
                    <span>导航</span>
                </div> -->
                <div class="full_box" id="equViewArea"></div>

                <div id="closeBtn" @click="equPull=false" class="content_center item_sys_op" style="padding-bottom:5px;">
                    <span>关闭</span>
                </div> 
            </div>

            </transition>

        </div>
        
        <!--菜单栏区域-->
        <transition>
            <div id="menu" v-if="menuActive">
                <div style="width:100%; height:50px; padding-top:20px; padding-bottom:40px; box-sizing: content-box;">
                    
                    <!--菜单栏头像-->
                    <div  style="float:left; height:100%; width:50px;  border-radius:50%; ">
                        <img src ="@/assets/xgjgas/imgs/user_icon3.png" width="100%" height="100%" style="border-radius:50%;"/>
                    </div>
                    
                    <div style="float:left; padding-left:10px; padding-top:5px;">
                        <p style="font-weight:bold; margin-bottom:0px;">{{$store.state.profile.name}}</p>
                        <p>{{$store.state.profile.phone}}</p>
                    </div>
                </div>
                
                <!--菜单功能区域-->
                <div class="fun_link">
                    <a @click="$router.push('equipment')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <span class="icon">
                            <span class="iconfont icon-dashboard"></span>
                        </span>
                        <span class="item" >设备列表</span>
                    </div>
                    </a>
                    <a @click="$router.push('historyInfo')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <span class="icon">
                            <span class="iconfont icon-cloud"></span>
                        </span>
                        <span class="item">历史数据</span>
                    </div>
                    </a>
                    <a @click="$router.push('warning')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <span class="icon">
                            <span class="iconfont icon-alert"></span>
                        </span>
                        <span class="item">报警信息</span>
                    </div>
                    </a>
                    <a @click="$router.push('feedback')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <span class="icon">
                            <span class="iconfont icon-message"></span>
                        </span>
                        <span class="item">反馈意见</span>
                    </div>
                    </a>
                    <a @click="$router.push('profile')" >
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <span class="icon">
                            <span class="iconfont icon-user"></span>
                        </span>
                        <span class="item">关于我</span>
                    </div>
                    </a>
                    <a  @click="$router.push('serviceHome')">
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <span class="icon">
                            <span class="iconfont icon-flag"></span>
                        </span>
                        <span class="item">售后运营平台</span>
                    </div>
                    </a>
                    <a @click="logout" >
                    <div class="col-xs-12 itemLine" style="padding-left:15px;">
                        <span class="icon">
                            <span class="iconfont icon-close-circle"></span>
                        </span>
                        <span class="item">退出登录</span>
                    </div>
                    </a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
const vm = {
    name: 'gasHome',
    data() {
        return {
            map:null,
            menuActive:false ,
            equPull:false,
            equipments:{},
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
            this.$request({
                url:"/xgjLogoIndex.listRoad.do",
                method:"POST",
                params:{
                    fCustomId:localStorage.getItem("userId"),
                    pagesize:999,
                    startindex:1,
                    status:"ALL"
                }
            },res => {
                if(res.data.message){
                    console.log(res.data.message) ; 
                    this.equipments = res.data.XgjEntityMsg ;  
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
            var that=this;
            var equ = that.equipments ; 
            //遍历设备列表，添加marker
            for(var i=0; i<equ.length; i++){
                var lng = equ[i].longitude ; 
                var lat = equ[i].latitude ; //AMap.LngLat
                var marker = new AMap.Marker({
                    icon:new AMap.Icon({
                        imageSize:new AMap.Size(36,36),
                        image:"https://cloud.yunpuhuaxing.com/upload/equ.png"
                    }),
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-18, -18),
                    extData:{
                        xgjRoads:equ[i].xgjRoads,
                        boxName:equ[i].address, 
                        lnglat:lng+","+lat ,
                    }

                });
                marker.setMap(that.map);
                
                marker.on("click",function(event){
                    console.log(event) ; 
                    that.equPull = true ; 
                    var exeData = event.target.getExtData() ; 
                    var records = exeData.xgjRoads ; //设备列表  这个数组可能为空，是否需要进行判断  ？
                    console.log(exeData) ; 
                    var panelArr = [] ; 
                    for(var i=0 ;i<records.length ; i++){
                         //创建DOM
                        console.log("设备名称："+records[i].roadname) ; 
                        var equId = records[i].id ; 
                        var equName = exeData.boxName+"-"+records[i].roadname  //名称：如：嘉豪国际中心-出压
                        var No = records[i].boxsn ;  //编号：如：sy_box_n005
                        var snNo= "" ; 
                        var equType = 0 ; //默认表示压力采集仪
                        //进行出压，进压，流量的判断
                        if(records[i].xgjGatherFlowDatas.length != 0){
                            //流量
                            snNo = records[i].xgjGatherFlowDatas[0].sn ; 
                            equType = 1 ; 
                        }
                        if(records[i].xgjGatherIPDatas.length != 0 ){
                            //进口压力
                            snNo = records[i].xgjGatherIPDatas[0].sn ; 
                        }
                        if(records[i].xgjGatherOPDatas.length != 0 ){
                            //出口压力
                            snNo = records[i].xgjGatherOPDatas[0].sn ; 
                        }

                        var panel = equType == 0 ?
                                    "<div class='equ_item' equId='"+equId+"' sn='"+snNo+"' equtype='"+equType+"' ondblclick='toTargetEqu(this)'>"+
                                        "<div class='full_height' style='width:55px; float:left; padding:5px;'>"+
                                            "<img src='"+require("@/assets/xgjgas/imgs/yali-2.png")+"' class='full_box'/>"+
                                        "</div>"+
                                        "<div class='full_height' style='float:left; padding:5px 0 0 15px;'>"+
                                            "<span style='font-size:16px;'>"+equName+"</span><br />"+
                                            "<span style='font-size:12px;'>"+No+"</span>"+
                                        "</div>"+
                                    "</div>" : 
                                    "<div class='equ_item' equId='"+equId+"' sn='"+snNo+"' equtype='"+equType+"'  ondblclick='toTargetEqu(this)'>"+
                                        "<div class='full_height' style='width:55px; float:left; padding:5px;'>"+
                                            "<img src='"+require("@/assets/xgjgas/imgs/liulianji-2.png")+"' class='full_box'/>"+
                                        "</div>"+
                                        "<div class='full_height' style='float:left; padding:5px 0 0 15px;'>"+
                                            "<span style='font-size:16px;'>"+equName+"</span><br />"+
                                            "<span style='font-size:12px;'>"+No+"</span>"+
                                        "</div>"+
                                    "</div>"; 
                                  
                        
                        panelArr.push(panel) ; 
                    }

                    var generalPanel = "<div class='content_center item_sys_op' lnglat='"+exeData.lnglat+"' box='"+exeData.boxName+"' onclick='toAmap(this)'>"+
                                            "<span>导航</span>"+
                                        "</div>"; 

                    
                    //清空原有DOM，添加新DOM
                    $("#equViewArea").empty() ;
                    $("#equViewArea").prepend(generalPanel) ; 
                    for(var i=0; i<panelArr.length;i++){
                        $("#equViewArea").prepend(panelArr[i]) ; 
                    }
                     
                }) ; 
            }
        },
        //================================================================
		//获取profile
		getProfile:function(){
			console.log("获取profile") ; 
			var _this = this ; 
			this.$request({
				url:"/xgjUserInfo.getInfo.do",
				method:"POST",
				params:{
					fUserId:localStorage.getItem("userId"),
				}
			},res => {
				if(res.data.code == 1){
					//保存数据到store
					console.log(res.data.content[0]) ; 
					_this.$store.commit('setBaseInfo',res.data.content[0]) ; 
				}else{
					alert(res.data.msg) ; 
				}
			},err => {
				console.log(err) ; 
			}) ;  
		},
        //退出登录
        logout:function(){
            //清空登录信息，userId,username,password
            localStorage.removeItem("userId")  ;
            localStorage.removeItem("username")  ;
            localStorage.removeItem("password")  ;
            this.$router.push("/login") ; 
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
		border-bottom:1px solid #ddd;
		box-shadow: 0 0px 5px 1px #ddd;
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
        border:1px solid #ddd;
        box-shadow: 0 0 10px 1px #ddd;
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
        width:200px;
        border-right:1px solid #ddd;
        background-color:#fff;
        box-shadow:0 0 5px 1px #ccc;
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
        line-height: 45px; 
        padding-left:10px;  
    }

    .itemLine {
        border-bottom: 1px solid #f0f0f0;
    }

    .icon {
        color:#727CF5 ; 
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
