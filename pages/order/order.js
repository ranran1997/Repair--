// pages/order/order.js
const app = getApp();   
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: "",
    state:"" //订单状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.topfix.cn/repair/order/queryOrderByUser',
      data: {
        userOrderState:1
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + app.getsessionId()  },
      dataType: "json",
      success: res => {
        for (var i = 0; i < res.data.length;i++){
          console.log()
          if (res.data[i].userOrderState == "1") {
            this.setData({
              state: "未完成"
            })
          } else if (res.data[i].userOrderState == "2") {
            this.setData({
              state: "进行中"
            })
          } else if (res.data[i].userOrderState == "3") {
            this.setData({
              state: "已完成"
            })
          }
        }
        this.setData({
          order: res.data
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