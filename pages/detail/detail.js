// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: {}
  },
  myid: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myid = options.id
  },
  handleShopCar () {
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })
  },
  handleClick() {
    if (wx.getStorageSync('isLogin') === true) {
      //1. 先取出此商品是否存过，如果存过，让数据+++
      //2. 如果没有存过，post新数据进去
      wx.request({
        url: `http://localhost:3030/carts?goodId=${this.data.datalist.id}`,
        success:res=>{
         if(res.data.length===0){
          this.addCart()
         }else{
           this.putCart(res.data[0])
         }
        }
      })
      
    } else {
      wx.switchTab({
        url: '/pages/center/center',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: `http://localhost:3030/goods?id=${this.myid}`,
      success: res => {
        this.setData({
          datalist: res.data[0]
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addCart () {
    wx.request({
      url: 'http://localhost:3030/carts',
      data: {
        goodId: this.data.datalist.id,
        number: 1,
        username: wx.getStorageSync('users').nickName,
        checked: false
      },
      method: 'post',
      success: res => {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
          })
      }
    })
  },
  putCart (obj) {
    wx.request({
      url: `http://localhost:3030/carts/${obj.id}`,
      data: {
        ...obj,
        username:wx.getStorageSync('users').nickName,
        number:1+obj.number
      },
      method: 'put',
      success: res => {
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000
          })
      }
    })
  }
})