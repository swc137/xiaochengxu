// page/addressList/addressList.js
var api = require('../../util/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:'',
    user_id:''
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
    var info = {'user_id':''};
    wx.getStorage({
      key: 'data',
      success: function (res) {
        info['user_id'] = res.data;
        that.setData({
          user_id: res.data
        })
        api.addressList({
          method: 'POST',
          data: info,
          success: (res) => {
            var arr = res.data.data;
            //console.log(arr)
            that.setData({
              addressList:arr
            });
          }
        });
      }
    })
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
  /**
   * 设为默认
   */
  radioChange:function(e){
    var that = this;
    var id = e.detail.value;
    var user_id = that.data.user_id;
    var info = { 'address_id': id, 'user_id': user_id};
    api.setDefault({
      method: 'POST',
      data: info,
      success: (res) => {
        var code = res.data.code;
        if(code == '1001'){
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 800
          })
        }
      }
    });
  },
  /**
   * 编辑
   */
  edit:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var user_id = that.data.user_id;
    wx.navigateTo({
      url: '../addAddress/addAddress?id=' + id + '&user_id=' + user_id,
    })
  },
  /**
   * 删除
   */
  delete:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var user_id = that.data.user_id;
    var info = { 'address_id': id, 'user_id': user_id };
    var userId = { 'user_id': user_id};
    api.deteleAddress({
      method: 'POST',
      data: info,
      success: (res) => {
        var code = res.data.code;
        if(code == '1001'){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 800
          })
          api.addressList({
            method: 'POST',
            data: userId,
            success: (res) => {
              var arr = res.data.data;
              that.setData({
                addressList: arr
              });
            }
          });
        }

      }
    });
  },
  /**
   * 新建收货地址
   */
  addAddress:function(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  }
})