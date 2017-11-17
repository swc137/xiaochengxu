// page/form/form.js
var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name:'',
    mobile:'',
    zx_type:'',
    zx_mode:''
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
  
  },
  inName:function(e){
    var that = this;
    that.setData({
      user_name:e.detail.value
    });
  },
  inMobile: function (e) {
    var that = this;
    that.setData({
      mobile: e.detail.value
    });
  },
  inType: function (e) {
    var that = this;
    that.setData({
      zx_type: e.detail.value
    });
  },
  inMode: function (e) {
    var that = this;
    that.setData({
      zx_mode: e.detail.value
    });
  },
  formSubmit:function(e){
    var that = this;
    var user_name = that.data.user_name;
    var mobile = that.data.mobile;
    var zx_type = that.data.zx_type;
    var zx_mode = that.data.zx_mode;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 500
      })
      return false;
    }
    if (user_name.trim() == '' || mobile.trim() == ''){
      wx.showModal({
        title: '提示',
        content: '请完善您的信息!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {

          } else if (res.cancel) {

          }
        }
      })
    }else{
      api.forSubmit({
        data:e.detail.value,
        success: (res) => {
          var arr = res.data.msg;
          wx.showModal({
            title: '提示',
            content: '提交成功，我们会尽快联系您！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              } else if (res.cancel) {

              }
            }
          })
        }
      });
    }
  }
})