<!--登录页面-->
<template >
    <div id="login" class="full_box content_center" :style="{backgroundImage: 'url(' + require('@/assets/xgjgas/imgs/back.png') + ')'}">
		<div id="app_name">
			<h1 style="text-align:center; font-size:45px; font-weight:500; color:#fff;">智能燃气</h1>
		</div>
		<div style="padding-left:50px; padding-right:50px;">
			<form>
			  <div class="form-group input-group-lg" style="padding-bottom:10px;">
				<input id="username" v-model="username"  type="text" class="form-control"  placeholder="用户名" >
			  </div>
			  <div class="form-group input-group-lg" style="padding-bottom:20px;">
				<input id="password" v-model="password" type="password" class="form-control" placeholder="密码">
			  </div>
			  
			  <button style="width:100%; " type="button" @click="login" class="btn btn-success btn-lg">登录</button>
			</form>
			
		</div>
		
		
		<div id="footer" style="color:#fff;">
			<p style="text-align:center;">北京鑫广进燃气设备研究所</p>
			<p style="text-align:center;">V3.0.1</p>
		</div>
	</div>
</template>

<script>
export default {
	name:"gasLogin",
	data() {
		return {
			username:"" ,
			password:"" ,
		}
	},
	methods: {
		//登录逻辑
		login:function(){
			//获取用户输入信息
			console.log("用户名："+this.username+"\n密码："+this.password) ; 
			if(this.username == "" || this.password == ""){
				this.$notify({
					title: '登录提示',
					message: '用户名或密码不能为空',
					type: 'warning'
				});
			}else{
				//执行登录 
				this.loginRequest(this.username,this.password) ; 
			}
			
		},
		//自动登录逻辑
		automaticLogin:function(){
			//获取内存中的用户名和密码自动登录
			if(localStorage.getItem("userName") != null && localStorage.getItem("password") != null){
				var username = localStorage.getItem("userName") ;
				var password = localStorage.getItem("password") ;
				this.loginRequest(username,password) ; 
			}else{
				return false ; 
			}
			
		},
		//登录请求
		loginRequest:function(username,password){
			var _this = this ; 

			this.$request({
				method: "post",
				url:"/xgjUser.logindata1.do?",
				params: {
					username: username, //账号
					password: password, //密码
					//cid: plus.push.getClientInfo().clientid,
					type: "1",//1正式2测试
				}
			},res=>{
				if (res.data.condition == 0) {
					if(res.data.accessToken=="" ){
						//智能设备平台
						localStorage.setItem("userName",username) ;
						localStorage.setItem("userId", res.data.userId);
						localStorage.setItem("userRole", res.data.userRole);
						_this.getProfile(); 
						_this.$router.push("/gasHome");
					}else{
						//售后运营平台 
						localStorage.setItem("userName",username) ;
						localStorage.setItem("password",password) ;
						localStorage.setItem("userId",res.data.userId) ;
						localStorage.setItem("userRole", res.data.userRole);
						localStorage.setItem("accessToken",res.data.accessToken) ; 
						_this.getProfile() ; 
						_this.$router.push("/serviceHome") ; 
					}
				} else {
					 _this.$notify({
						title: '登录提示',
						message: '用户名或密码错误',
						type: 'warning'
					}); 
				}
			},err=>{
				 _this.$notify({
					title: '登录提示',
					message: '程序错误,请联系管理员',
					type: 'error'
				}); 
			}) ; 

		},
		//获取profile --- 智能燃气平台用户
		getProfile:function(){
			console.log("获取profile") ; 
			var _this =this ; 
            _this.$request({
                method: "post",
                url: "/xgjUserInfo.getInfo.do",
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
	},
	mounted() {
		//自动登录
		this.automaticLogin() ; 

		//自动填写用户名和密码输入框
		this.username = localStorage.getItem("userName") != null ? localStorage.getItem("userName"):'' ; 
		this.password = localStorage.getItem("password") != null ? localStorage.getItem("password"):'' ; 
	},
}
</script>


<style scoped>
	body {
		width:100%; 
		height:100%; 
	}

    #login {
        background-repeat: round;
    }

    #footer{
		position:fixed;
		width:inherit;
		bottom:20px;
	}
	
	#app_name{
		position:fixed;
		width:inherit;
		top:80px;
	}

	.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }
</style>
