// pages/persona/persona.js
const app = getApp();   
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("avatarUrl")==""){
      this.setData({
        hide: false,
      })
    }else{
      this.setData({
        hide: true,
        avatarUrl: wx.getStorageSync("avatarUrl"),
      }) 
    }
  },
  bindGetUserInfo: function (e) {
    let info = JSON.parse(e.detail.rawData)
    // console.log(info)
    this.setData({
      hide: true,
      nickName: info.nickName,
      avatarUrl: info.avatarUrl,
    })
    wx.setStorageSync('avatarUrl', info.avatarUrl)
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '400-811-5111',
      success: function () {
        // console.log("拨打电话成功！")
      },
      fail: function () {
        // console.log("拨打电话失败！")
      }
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