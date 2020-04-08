//app.js - 项目的入口js模块
// 注册小程序-小程序需要初始化的内容
App({
  onLaunch(){
    console.log('小程序的app生命周期之一','小程序的初始化操作')
  },
  onShow (data){
    console.log('小程序显示-收集数据，数据分析，广告统计',data);
    console.log('根据不用的场景值，进入不同的业务模式，扫描二维码，自动进入现场下单模式，不是通过二维码进来的小程序，自动进入外卖模式');
    //切换页面
  },
  onHide (){
    console.log('小程序隐藏');
  },
  onError (){
    console.log('error');
  }
})