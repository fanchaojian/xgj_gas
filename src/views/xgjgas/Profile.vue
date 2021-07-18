<template>
<div class="full_height">
	<div style="width:100%; height:100%;">
        <my-header pageName="我的简档" doSearch="false"  backPath="/gasHome" />
		
        <div style="width:100%; height:100%;  padding:70px 10px 20px;">
            <div style="width:100%; height:100%; border:1px solid #eee; box-shadow:0 0 5px 1px #eee; background-color:#fff; border-radius:5px; padding:0px 5px;">
                <div style="width:100%; height:100%; padding:5px 15px 15px;;  background-color:#fff;">
                    <div class="item row" style="border-bottom:10px solid #E3EAEF; line-height:40px; padding-left:15px; padding-right:15px;">
                        <div class="col-xs-2">姓名：</div>
                        <div class="col-xs-10" align="right">{{$store.state.profile.name}}</div>
                    </div>
                    <div class="item row" style="border-bottom:10px solid #E3EAEF; line-height:40px; padding-left:15px; padding-right:15px;">
                        <div class="col-xs-2">职位：</div>
                        <div class="col-xs-10" align="right">{{$store.state.profile.roleName}}</div>
                    </div>
                    <div class="item row" style="border-bottom:10px solid #E3EAEF; line-height:40px; padding-left:15px; padding-right:15px;">
                        <div class="col-xs-2">单位：</div>
                        <div class="col-xs-10" align="right">{{$store.state.profile.officeName}}</div>
                    </div>
                    <div class="item row" style="border-bottom:10px solid #E3EAEF; line-height:40px; padding-left:15px; padding-right:15px;">
                        <div class="col-xs-2">手机：</div>
                        <div class="col-xs-10" align="right">{{$store.state.profile.phone}}</div>
                    </div>
                    <div class="item row" style="border-bottom:10px solid #E3EAEF; line-height:40px; padding-left:15px; padding-right:15px;">
                        <div class="col-xs-2">邮箱：</div>
                        <div class="col-xs-10" align="right">{{$store.state.profile.email}}</div>
                    </div>

                    <div class="content_center" style="margin-top:20px; width:100%;">
                        <button @click="logout" style="margin:0 auto;" class="btn btn-default">退出登录</button>
                    </div>
                </div>
            </div>
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
      }
  },
  methods: {
    logout:function(){
        //清空登录信息，userId,username,password
        localStorage.removeItem("userId")  ;
        localStorage.removeItem("username")  ;
        localStorage.removeItem("password")  ;

        this.$router.push("/login") ; 
    },
    
  },
  components:{
    MyHeader,
  },
  mounted() {
  },
}
</script>


<style scoped>
.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{
    padding-left:0;
    padding-right:0 ; 
  }
</style>
