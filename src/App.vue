<template>
  <div id="app">
	  <keep-alive include="serviceHome">
    	<router-view/>
	  </keep-alive>
  </div>
</template>

<script>
//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../src/mui.js'

//阿里巴巴图标库
import '@/assets/iconFont/albaba_AntDesign0fficialIcons/iconfont.css'
import '@/assets/iconFont/albaba_AntDesign0fficialIcons/iconfont.js'


export default {
  name: 'App'
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		width:100%;
		height:100%;
	}

	* {
		font-family: '雅黑';
		font-weight: 400;
	}

	html {
		width:100%; 
		height:100% ; 			
	}

	body {
		width:100%; 
		height:100%; 
	}

	.full_box {
		height:100%; 
		width:100% ;
	}
	
	.full_height {
		height: 100%;
	}

	.full_width {
		width: 100%;
	}

	.container-fluid {
		padding-right: 0px; 
		padding-left: 0px; 
	}

	.content_center{
		z-index:100;
		margin:0 auto ;
		
		display:-moz-box;
		-moz-box-pack:center;
		-moz-box-align:center;
		display:-webkit-box;
		-webkit-box-pack:center;
		-webkit-box-align:center;
		display:box;
		box-pack:center;
		box-align:center;
	}

	.vertical_center {
		display:-moz-box;
		-moz-box-pack:center;
		-moz-box-align:center;
		display:-webkit-box;
		-webkit-box-pack:center;
		-webkit-box-align:center;
		display:box;
		box-pack:center;
		box-align:center;
	}
	
	.doSomething { 
		border:1px solid #ccc;
		border-radius:4px;
		font-size:12px;
    	font-weight:500;
    	background:#fff;
    	padding-left:5px;
    	padding-right:5px;
		margin-left:15px;
		margin-right:15px;
		text-align:center ;
		
	}
	.doSomething:hover {
		background-color:#F0FFFF!important ;
		border:1px solid #00BFFF!important; 
		box-shadow:0 0 1px #00BFFF!important;
		color:#00BFFF!important ;
		cursor:pointer!important;
	}
	
	.doSomething span {
		line-height:25px;
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

	.common_shadow{
		border:2px solid #ccc;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)  ; 
	}

	.common_shadow2{
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)  ; 
	}
	
	
</style>
