// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    looplist:[],
    datalist:[],
    isBottom:true
  },
  currentPage:1,
  datalong:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(window,document)
    // 小程序中没有window对象和document对象
    //一切基于dom操作的库，在小程序中无法使用
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /**
     * 1. 小程序没有跨域限制
     * 2. 小程序为了用户安全，加入了白名单机制
     * 3. 后台接口必须是https协议的接口
     */
    // wx.request({
    //   url: 'http://m.maoyan.com/ajax/mostExpected?ci=10&limit=10&offset=0&token=&optimus_uuid=750959604E3D11EA954F63C480079A41DE693DC6E8D043958D5DA45F4FB86AA8&optimus_risk_level=71&optimus_code=10',
    //   success(res){
    //     console.log(res.data.coming)
    //   }
    // })
    wx.request({
      url: 'http://localhost:3030/recommends',
      success:res=>{
        console.log(res.data)
        this.setData({
          looplist : res.data
        })
      }
    }) 
    wx.request({
      url: 'http://localhost:3030/goods?_page=1&_limit=5',
      success:res=>{
        console.log(res.data)
        this.datalong =  res.header['X-Total-Count'] -0;
        this.setData({
          datalist : res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉了')
    //模拟ajax
    setTimeout(()=>{
      //主动调用方法，让下拉框回去
      wx.stopPullDownRefresh()
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.currentPage*5<=this.datalong){
      wx.request({
        url: `http://localhost:3030/goods?_page=${++this.currentPage}&_limit=5`,
        success:res=>{
          console.log(res.data)
          this.setData({
            datalist : [...this.data.datalist,...res.data]
          })
        }
      })
    }else{
      this.setData({
        isBottom:false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleChangePage (ev) {
    console.log(ev.currentTarget.dataset.id)
    //点击跳转id页面
    //navigateTo：保留当前页面，跳转到新的页面
    //redirectTo:关闭当前页面，跳转到新的页面
    //navigateBack:回到上一个页面
    //switchTab:选项卡切换
    wx.navigateTo({
      url: `/pages/detail/detail?id=${ev.currentTarget.dataset.id}`,
    })
  }
})