<!--正在运行的调压箱列表-->
<template>
  <div style="width:100%; height:100%; ">
    <div style="width:100%; height:100%;">
      <!--头部区域-->
      <!--<div id="header" class="content_center">
        <div class="col-xs-2" style="vertical-align:centenr;">
          <span @click="$router.push('/')" style="color:#777;" class="iconfont icon-left"></span>
        </div>
        <div class="col-xs-10 full_height" style="line-height:50px;">
          <span style="line-height:inherit;">调压器列表</span>
          <span id="search_icon" class="iconfont icon-search" style="float:right; line-height:inherit; color:#ccc; "></span>
          <span style="float:right; line-height:inherit;">
            <input @click="searchFocus($event)" id="searchHere" type="text" placeholder="搜索"/>
          </span>
        </div>
      </div> -->
      <my-header pageName="调压箱列表" doSearch="true" @func="getKeywords" backPath="/gasHome" />
      
      <div style="width:100%;  padding:70px 10px 0;">
          <div @click="$router.push('/equipmentDetails')" class="item">
            <div class="equ_name_box">
                <div style="float:left; height:100%; width:35px; ">
                  <img src="@/assets/xgjgas/imgs/yali-2.png" width="30" height="30" style="margin-top:5px;"/>
                </div>
                <div style="float:left; height:100%;">
                  <p class="equ_name">智能调压器-大兴路政01-出压</p>
                  <span style="font-size:10px;">sy_box_noo5</span>
                </div>
            </div>
            <div style="height:90px; width:100%;">
              <div class="col-xs-4" style="height:100%; padding:2px;">
                <div class="content_center item_data_box">
                  <img src="@/assets/xgjgas/imgs/yali-1.png" /> <br />
                  <span class="font_small">压力</span><br />
                  <span style="color:#111; font-weight:bold;">100.99</span> <br /> 
                  <span class="font_small">kpa</span>            
                </div>
              </div>
              <div class="col-xs-4" style="height:100%; padding:2px;">
                <div class="content_center item_data_box">
                  <img src="@/assets/xgjgas/imgs/wendu-1.png" /> <br />
                  <span class="font_small">温度</span><br />
                  <span style="color:#111; font-weight:bold;">32.8</span> <br /> 
                  <span class="font_small">℃</span>            
                </div>
              </div>
              <div class="col-xs-4" style="height:100%; padding:2px;">
                <div class="content_center item_data_box">
                  <img src="@/assets/xgjgas/imgs/dianliang-1.png" /> <br />
                  <span class="font_small">电压</span><br />
                  <span style="color:#111; font-weight:bold;">3.7</span> <br /> 
                  <span class="font_small">V</span>            
                </div>
              </div>
              
            </div>

            <div style="width:100%; margin-top:5px; height:25px; background-color:#F1F3FA;">
              <span style="font-size:10px; line-height:25px; padding-left:4px;">更新于：2020-05-22 12:00:00</span>
            </div>
        </div>
          
        <!--搜索关键字测试-->
        <h2>{{keyWords}}</h2>
          
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/xgjgas/Header.vue';

export default {
  name: '',
  data() {
	  return {
		   keyWords:"",
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
    //获取子组件中的搜索关键字
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
      width:100%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)  ; 
      border-radius:5px;
      padding:5px 10px;
      background-color:#fff;
      margin-bottom:15px;
  }

  .equ_name_box {
      height:50px;  width:100%;
  }

  .equ_name {
      margin-bottom:0; margin-top:5px; font-size:14px; font-weight:bold; color:#333333;
  }

  .item_data_box {
    height:100%; width:100%; border:1px solid #ddd; text-align:center;
    border-radius:4px;
  }
  
  .item_data_box img {
    width:20px;
    height:20px;
  }

  .font_small {
    font-size:8px;
  }

  .font_small_white {
    font-size:8px;
    color:#fff;
  }

  .font_white {
    color:#fff;
  }


  .col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }
</style>
