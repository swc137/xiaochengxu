// register.js
var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    errorMsg:''
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
    var that= this;
    that.setData({
      hidden: true
    })
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
  //提交表单
  formSubmit:function(e){
    var that = this;
    var info = e.detail.value;
    var flag = false;
    if(info.mobile != undefined && info.mobile!= ""){
      if ((/^1[3456789]\d{9}$/.test(info.mobile))) {
        flag = true;
      }else{
        that.setData({
          errorMsg:"手机号格式有误"
        })
      }
    }
    if(flag){
      api.register({
        success: (res) => {
          var msg = res.data.msg;
          var code = res.data.code;
          that.setData({
            errorMsg: msg
          })
          if (code == "10001") {
            that.setData({
              hidden: false
            })
          }
        }
      }, info);
    }
  },
  confirm:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  }
})