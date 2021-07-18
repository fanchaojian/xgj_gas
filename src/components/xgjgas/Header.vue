<template>
    <div id="header" class="content_center">
        <div class="col-xs-2" style="vertical-align:centenr;">
          <span @click="back" style="color:#777;" class="iconfont icon-left"></span>
        </div>
        <div class="col-xs-10 full_height" style="line-height:50px;">
          <span style="line-height:inherit; vertical-align: middle; font-size:16px;">{{pageName}}</span>
		  <div v-if="seatchFun" style="line-height:inherit; display:inline;">
			<span @click="searchByKeywords" id="search_icon" class="iconfont icon-search" style="float:right; line-height:inherit; color:#999; "></span>
			<span style="float:right; line-height:inherit;">
				<input @click="searchFocus($event)" id="searchHere" type="text" placeholder="搜索"/>
			</span>
		  </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data() {
	  return {
		 seatchFun:this.doSearch == "true" ? true:false
	  }
  },
  methods: {
	  searchFocus(obj){
		var $el = $(obj.currentTarget) ;
		$el.css("width","150px") ; 
	  },
	  back(){
		this.$router.push({
			path:this.backPath,

		})
	  },
	  //关键字搜索
	  searchByKeywords:function(){
		  //获取输入框的值
		  var keyWords = $("#searchHere").val().trim() ;
		  //通过事件绑定机制，将值传递到父组件中
		  this.$emit('func',keyWords) ;
	  }
  },
  props:{
	  pageName:String,
	  doSearch:String,
	  backPath:String
  }
}
</script>

<style scoped>
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

	.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
		padding-left:0;
		padding-right:0 ; 
	}
</style>