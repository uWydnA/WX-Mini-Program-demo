// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
    res:{name:1}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      //json-server提供的特殊功能_expand
      url: `http://localhost:3030/carts?_expand=good&username=${wx.getStorageSync('users').nickName}`,
      success: res => {
        this.setData({
          datalist: res.data
        })
      }
    })
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
  checkboxChange (ev) {
    let id = ev.currentTarget.dataset.id;
    let obj = this.data.datalist.filter(val=>val.id===id)[0]
    if(ev.detail.value.length===1){
      obj.checked = true
    }else{
      obj.checked = false
    }
    this.setData({
      datalist:[...this.data.datalist.filter(val=>val.id!=id),obj].sort((a,b)=>a.id-b.id)
    })
    this.updateCart(obj)
  },
  updateCart(cartobj){
    wx.showLoading({
      title: '加载中',
    })
    let {username,checked,goodId,number} = cartobj
    wx.request({
      url: `http://localhost:3030/carts/${cartobj.id}`,
      data:{
        goodId,
        number,
        username,
        checked
      },
      method:'put',
      success:res=>{
        wx.hideLoading()
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  total () {
    return 2999
  },
   handleLongTap (ev) {
    let id = ev.currentTarget.dataset.id
    wx.showModal({
      title: '删除确认',
      content: '你确认要删除吗',
      success: res=>{
        if (res.confirm) {
          console.log('用户点击确定')
          this.setData({
            datalist:this.data.datalist.filter(val=>val.id!=id)
          },()=>{
            wx.request({
              url: `http://localhost:3030/carts/${id}`,
              method:'delete'
            })
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:1000
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  handleJian (ev) {
    let id = ev.currentTarget.dataset.id
    let newlist = this.data.datalist.map(val=>{
      if(val.id===id){
        return {
          ...val,
          number:val.number>1?val.number-1:1
        }
      }else{
        return val
      }
    })
    this.setData({
      datalist:newlist
    })
    this.updateCart(this.data.datalist.filter(val=>val.id===id)[0])
  },
  handleAdd (ev) {
    let id = ev.currentTarget.dataset.id
    let newlist = this.data.datalist.map(val=>{
      if(val.id===id){
        return {
          ...val,
          number:val.number+1
        }
      }else{
        return val
      }
    })
    this.setData({
      datalist:newlist
    })
    this.updateCart(this.data.datalist.filter(val=>val.id===id)[0])
  }
})