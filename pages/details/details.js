// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: "",
    fault: [], //故障类型
    price: '', //价格
    time: "", //时间
    state: "", //订单状态
    address: "", //订单状态
    serviceName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      price: options.price
    })
    wx.request({
      url: 'https://www.topfix.cn/repair/business/queryServicebyid',
      data: {
        id: options.serviceId
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + app.getsessionId() },
      dataType: "json",
      success: res => {
        this.setData({
          serviceName: res.data.serviceName
        })
      },
    })
    wx.request({
      url: 'https://www.topfix.cn/repair/order/queryOrderDetails',
      data: {
        number: options.userOrderNumber
      },
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + app.getsessionId() },
      dataType: "json",
      success: res => {
        let address = res.data.order.spare;
        let data = res.data.orderDetailslist[0].orderDate;
        let state = res.data.orderDetailslist[0].orderState;
        if (state == "1") {
          this.setData({
            state: "未完成"
          })
        } else if (state == "2") {
          this.setData({
            state: "进行中"
          })
        } else if (state == "3") {
          this.setData({
            state: "已完成"
          })
        }
        this.setData({
          details: res.data,
          fault: res.data.orderDetailslist,
          address: res.data.order.spare,
          time: this.formatDateTime(data)
        })
      },
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '400-811-5111',
      success: function () {
      },
      fail: function () {
      }
    })
  },
  back:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  //时间转换函数
  formatDateTime: function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
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