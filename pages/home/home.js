// pages/home/home.js
// 每个页面 必须Page()注册页面，页面生命周期
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytext:'',
    list:['111','222','333'],
    inow:0,
    isShow:false,
    isCreated:true
  },
  //定义一个事件处理函数
  handleClick () {
    this.setData({
      mytext:'xiaoming'
    })
  },
  handleIf () {
    this.setData({
      isCreated:!this.data.isCreated
    })
  },
  handleShow () {
    this.setData({
      isShow:!this.data.isShow
    })
  },
  handleInput (e){
    this.setData({
      mytext:e.detail.value
    })
  },
  changeColor(e){
    //e.target 当前事件源，不可靠，不确定点到的是哪个父或子DOM节点
    //e.currentTarget 绑定事件的dom节点，可靠
    this.setData({
      inow:e.currentTarget.dataset.id
    })
  },
  handleDel (e) {
    this.setData({
      list:this.data.list.filter((val,idx)=>idx!=e.currentTarget.dataset.id)
    })
  },
  submit () {
    this.setData({
      list:[...this.data.list,this.data.mytext],
      mytext:''
    })
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

  }
})