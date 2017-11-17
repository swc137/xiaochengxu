// page/addAddress/addAddress.js
var api = require('../../util/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:'请选择',
    id :'',
    user_id:'',
    detail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    // wx.getStorage({
    //   key: 'data',
    //   success: function (res) {
    //     that.setData({
    //       user_id: res.data
    //     })
    //   }
    // })
    if(id != undefined){
      that.setData({
        id:id
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
    var that = this;
    try {
      var value = wx.getStorageSync('data')
      if (value) {
        var user_id = that.data.user_id;
        var id = that.data.id;
        var info = { 'user_id': value, 'address_id': id }
        if (id != '') {
          api.addressDetail({
            data: info,
            method: 'POST',
            success: (res) => {
              var arr = res.data.data;
              var arrDetail = [arr.province, arr.city, arr.area];
              that.setData({
                detail: arr,
                region: arrDetail
              })
            }
          });
        }
        that.setData({
          user_id: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    
    
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
  //选择地区
  bindRegionChange:function(e){
    var that = this;
    that.setData({
      region: e.detail.value
    })
  },
  //保存表单
  formSubmit:function(e){
    var that = this;
    var info = e.detail.value;
    var region = that.data.region;
    info['province'] = region[0];
    info['city'] = region[1];
    info['area'] = region[2];
    if(info.username == ''){
      wx.showToast({
        title: '请输入收件人',
        icon: 'loading',
        duration: 800
      })
    } else if (info.mobile == ''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 800
      })
    } else if (region == '请选择'){
      wx.showToast({
        title: '请选择地区',
        icon: 'loading',
        duration: 800
      })
    } else if (info.address == ''){
      wx.showToast({
        title: '请输入详细地址',
        icon: 'loading',
        duration: 800
      })
    }else{

      try {
        var tag = wx.getStorageSync('data');
        info['user_id'] = that.data.user_id;
      } catch (e) {
      }
      if(that.data.id != ''){
        info['address_id'] = that.data.id;
      }
      api.saveAddress({
        data: info,
        method: 'POST',
        success: (res) => {
          var arr = res.data;
          if(arr.code = 1001){
            wx.navigateBack({
              url: '../addressList/addressList',
            })
          }
        }
      });
    }
  }
})