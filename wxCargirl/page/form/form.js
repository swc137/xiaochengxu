// page/form/form.js
var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name:'',
    mobile:'',
    chexing:'',
    productList:'',
    carIndex:'',
    yusuan:['5-10万','10-15万','15-20万','20-30万','30万以上'],
    index:'',
    token:api.token,
    phone:''
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
    var that = this;
    wx.getStorage({
      key: 'name',
      success: function (res) {
        that.setData({
          chexing: res.data
        })
        //console.log(res.data)
      },
    })
    //产品列表
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        var chexing = [];
        for(var i = 0;i<arr.length;i++){
          chexing.push(arr[i].info.title.value);
        }
        that.setData({
          productList: chexing
        })
      }
    }, 100, 1, '');

    //用户信息
    api.getSiteinfo({
      success: (res) => {
        var user_info = res.data.user_info.sysadmin;
        var phone = user_info.mobile;
        that.setData({
          phone: phone
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorage({
      key: 'name',
      data: '',
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
  bindCarChange:function(e){
    var that = this;
    that.setData({
      carIndex: e.detail.value
    })
  },
  bindYuChange: function (e) {
    var that = this;
    that.setData({
      index: e.detail.value
    })
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
  inChe: function (e) {
    var that = this;
    that.setData({
      chexing: e.detail.value
    });
  },
  formSubmit:function(e){
    var that = this;
    var user_name = that.data.user_name;
    var mobile = that.data.mobile;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 500
      })
      return false;
    }
    var index = that.data.index;
    var chexing = that.data.chexing;
    if (user_name.trim() == '' || mobile.trim() == '' || index == '' || chexing ==''){
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
        method:'POST',
        success: (res) => {
          var arr = res.data.msg;
          wx.showModal({
            title: '提示',
            content: '提交成功，我们会尽快联系您！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                  that.setData({
                    user_name: '',
                    mobile: '',
                    chexing: '',
                    index:''
                  })
              } else if (res.cancel) {

              }
            }
          })
        }
      });
    }
  },
  //拨打电话
  callPhone: function (e) {
    var that = this
    var phone = that.data.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})