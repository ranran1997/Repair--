// pages/system/system.js
const app = getApp(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radioItems:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.topfix.cn/repair/parts/queryserver',
      data: {
        PartsService:104,
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + app.getsessionId() },
      dataType: "json",
      success: res => {
        this.setData({
          radioItems: res.data[0]
        })
        wx.setStorageSync('model', res.data[0].partsName)
        wx.setStorageSync('serviceid', "104")
        wx.setStorageSync('prices', res.data[0].partsEellout)
        let partsidArr = [];
        partsidArr[0] = res.data[0].partsId
        wx.setStorageSync('partsidArr', partsidArr)
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
  onShareAppMessage: app.onShareAppMessage
})