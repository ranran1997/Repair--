//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        let code = res.code
        // console.log(code)
        wx.request({
          // url: 'http://192.168.3.6:8080/repair/wx_log/login',
          url: 'https://www.topfix.cn/repair/wx_log/login',
          data: {
            code: code,
          },
          method: "POST",
          // header: { 'Content-Type': 'application/json', },
          header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + this.getsessionId() },
          dataType: "json",
          success: res => {
            // 存储sessionId
            // console.log(res.data.sessionId,"11111")
            wx.setStorageSync('sessionId', res.data.sessionId)
          },
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData:{
    userInfo: null
  },
  getsessionId(){
    return wx.getStorageSync("sessionId") || 0
  },
  // 分享
  onShareAppMessage: function (res) {
    let that = this;
    return {
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})