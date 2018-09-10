// pages/phonefault/phonefault.js
const app = getApp(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serviceid: "",
    radioItems: "",
    selectColor: "",
  },
  // 选择故障类型
  changeCheckedHandle(event) {
    const { radioItems } = this.data;
    const item = radioItems[event.currentTarget.dataset.index];
    item.completed = !item.completed;
    this.setData({
      radioItems
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.setStorageSync('model', options.title)
    wx.setStorageSync('serviceid', options.serviceid)
    wx.request({//获取故障
      url: 'https://www.topfix.cn/repair/parts/queryserver',
      data: {
        PartsService: options.serviceid,
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + app.getsessionId() },
      dataType: "json",
      success: res => {
        this.setData({
          radioItems: res.data
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let faultArr = [];  //故障类型
    let partsidArr = [];  //故障类型id
    let priceArr = [];  //对应报价
    for (var i = 0; i < this.data.radioItems.length; i++) {
      let fault = this.data.radioItems[i].partsName;
      let partsId = this.data.radioItems[i].partsId;
      let price = this.data.radioItems[i].partsEellout;
      if (this.data.radioItems[i].completed == true) {
        faultArr.push(fault)
        partsidArr.push(partsId)
        // 存储选择的故障及Id
        wx.setStorageSync('faultArr', faultArr)
        wx.setStorageSync('partsidArr', partsidArr)
        priceArr.push(price)
      }
    }
    var prices = 0;
    for (var i = 0; i < priceArr.length; i++) {
      prices += priceArr[i];
    }
    // 存储预估报价
    wx.setStorageSync('prices', prices)
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
  onShareAppMessage: app.onShareAppMessage
})