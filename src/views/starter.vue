<!--
Author:凡朝剑
Date:20200402
function:作为“智能设备平台”和“售后运营平台”的转换判断页面

-->
<template>
  <div>
        <p>平台跳转中...</p>
  </div>
  
</template>

<!--JavaScript-->
<script>

export default {
    name:"starter",
    data(){
        return {
        } ; 
    },
    mounted(){
        console.log("starter页面") ;
        var _this = this ; 
        //判断登录方式，切换平台
        if (localStorage.getItem("userId") != null && localStorage.getItem("userName") != null) {
            if((localStorage.getItem("userName")).indexOf("@xgjgas.com") != -1){
                this.$request({
                    method: "get",
                    url: "/xgjUser.getAccessToken.do?",
                    params: {
                        username: localStorage.getItem("userName"),
                        password: localStorage.getItem("password"),
                    }
                },res=>{
                    if(res.data != false){
                        localStorage.setItem("accessToken",res.data);
                    }else{
                        _this.$router.push("/login");
                    }
                },err=>{
                    console.log("获取accesstoken失败。") ; 
                }) ;

                this.$router.push("/serviceHome");
            }else{
                //路由到智能设备平台
                console.log('设备监控平台') ; 
                this.$router.push("/gasHome");
            } 
        }else{
            //返回登录页面
             this.$router.push("/login");
        }
    }
}; 

</script>

<!--样式-->
<style lang="scss" scoped>

</style>