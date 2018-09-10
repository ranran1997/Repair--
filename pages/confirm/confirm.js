// pages/confirm/confirm.js
const app = getApp()
var interval = null //倒计时函数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hide: true,
    textTitle: "",
    change1: false,
    change2: true,
    serviceid: "",
    model: "", 
    selectColor: "", 
    prices: "",
    faultArr: "",
    partsidArr: "",
    name: "",
    telephone: "",
    code: "",
    all: ['黄浦区', '虹口区', '杨浦区', '闸北区', '普陀区', '长宁区', '静安区', '徐汇区', '闵行区', '奉贤区', '金山区', '松江区', '青浦区', '嘉定区', '宝山区', '浦东新区'],
    index: 0,
    area: "",
    address: "",
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码',
    currentTime: 61,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("selectColor") == "") {
      this.setData({
        selectColor: wx.getStorageSync("selectColor"),
      })
    } else {
      this.setData({
        selectColor: "(" + wx.getStorageSync("selectColor") + ")",
      })
    }
    this.setData({
      model: wx.getStorageSync("model"),
      serviceid: wx.getStorageSync('serviceid'),
      faultArr: wx.getStorageSync('faultArr'),
      partsidArr: wx.getStorageSync('partsidArr'),
      prices: wx.getStorageSync('prices')
    })
  },
  nameInput: function (e) {
    wx.setStorageSync('name', e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  codeInput: function (e) {
    console.log(e.detail.value,"输入的")
    this.setData({
      code: e.detail.value
    })
  },
  telInput: function (e) {
    wx.setStorageSync('telephone', e.detail.value);
    this.setData({
      telephone: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  addressInput: function (e) {
    wx.setStorageSync('address', e.detail.value);
    this.setData({
      address: e.detail.value
    })
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    let telephone = String(this.data.telephone);
    if (telephone == "") {
      console.log("111")
      that.setData({
        hide: false,
        textTitle: "请输入电话"
      })
      setTimeout(function () {
        that.setData({
          hide: true
        })
      }, 1700)
    }else {
      wx.request({
        url: 'https://www.topfix.cn/repair/sms/out',
        data: {
          "Phone": telephone
        },
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + app.getsessionId() },
        dataType: "json",
        success: res => {
          console.log("发送短信验证码", res.data);
       
        },
      })
    }
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  //立即下单
  save: function () {
    let that = this
    if (that.data.name == "") {
      that.setData({
        hide: false,
        textTitle: "请输入姓名"
      })
      setTimeout(function () {
        that.setData({
          hide: true,
          textTitle: "请输入姓名"
        })
      }, 1700)
    }
    else if (that.data.telephone == "") {
      that.setData({
        hide: false,
        textTitle: "请输入电话"
      })
      setTimeout(function () {
        that.setData({
          hide: true
        })
      }, 1700)
    }
    else if (that.data.code == "") {
      that.setData({
        hide: false,
        textTitle: "请输入验证码"
      })
      setTimeout(function () {
        that.setData({
          hide: true
        })
      }, 1700)
    }
    else if (that.data.address == "") {
      that.setData({
        hide: false,
        textTitle: "请输入详细地址"
      })
      setTimeout(function () {
        that.setData({
          hide: true
        })
      }, 1700)
    } else {
      console.log(this.data.code, "发送的")
      wx.request({
        url: 'https://www.topfix.cn/repair/sms/Verification',
        data: {
          "Verification": this.data.code,
        },
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded", "Cookie": "JSESSIONID=" + app.getsessionId() },
        dataType: "json",
        success: res => {
          console.log("检验验证码", res.data);
          if (res.data == "ok") {
            wx.request({
              url: 'https://www.topfix.cn/repair/order/add',
              data: {
                "serviceid": this.data.serviceid,
                "prices": this.data.prices,
                "partsidArr": this.data.partsidArr,
                "name": this.data.name,
                "address": this.data.all[this.data.index] + this.data.address
              },
              method: "POST",
              header: { 'Content-Type': 'application/json', "Cookie": "JSESSIONID=" + app.getsessionId() },
              dataType: "json",
              success: res => {
                console.log("下单", res.data);
                if (res.data == "ok") {
                  wx.navigateTo({
                    url: '../finish/finish'
                  })
                }
              },
            })
          } else {
            that.setData({
              hide: false,
              textTitle: "验证码错误"
            })
            setTimeout(function () {
              that.setData({
                hide: true
              })
            }, 1700)
          }
        },
      })
    }
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
    wx.removeStorageSync("name")
    wx.removeStorageSync("telephone")
    wx.removeStorageSync("code")
    wx.removeStorageSync("address")
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync("selectColor")
    wx.removeStorageSync("prices")
    wx.removeStorageSync("faultArr")
    wx.removeStorageSync("partsidArr")
    wx.removeStorageSync("name")
    wx.removeStorageSync("telephone")
    wx.removeStorageSync("code")
    wx.removeStorageSync("address")

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