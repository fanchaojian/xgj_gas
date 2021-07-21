import axios from 'axios'

export function request_SF(config,success,failure){
    //创建axios实例
    const instance = axios.create({
        //baseURL:'/sfapi',
        baseURL:'https://ap6.salesforce.com/services/apexrest',
        timeout:100000
    })
    //发送真正的网络请求
    instance(config)
    .then(res => {   //成功时将返回的数据通过参数的回调返回
        success(res) ;
    })
    .catch(err => {  //失败时将返回的数据通过回调返回
        failure(err) ; 
    })
}