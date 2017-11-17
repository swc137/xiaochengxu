// page/share/share.js
var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    h_id:'',
    person_num:'',
    kan_price:'',
    show:'hidden',
    price:'',
    user_id:'',
    status:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var hId = options.h_id;
    that.setData({
      h_id: hId
    });
    try {
      var value = wx.getStorageSync('data');
      if (value != '') {
        that.setData({
          user_id: value
        })
      } else {
      }
    } catch (e) {
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
    var h_id = that.data.h_id;
    api.getActInfo({
      method:'POST',
      data:{h_id:h_id},
      success:(res)=>{
        //console.log(res)
        var info = res.data;
        if(info.code == '1001'){
          that.setData({
            person_num: info.data.num,
            kan_price: info.data.info.total_price - info.data.info.kan_price,
            status: info.data.info.status
          })
        }
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
    var that = this
    return {
      title: '转发砍价',
      path: '/page/share/share?h_id=' + that.data.h_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //去砍价
  toKan:function(e){
    var that = this;
    try {
      var value = wx.getStorageSync('data');
      if (value != '') {
        that.setData({
          user_id: value
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先授权登录',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    } catch (e) {
    }
    var h_id = that.data.h_id;
    var user_id = that.data.user_id;
    api.toPrice({
      method:'POST',
      data: { h_id: h_id},
      success:(res) =>{
        //console.log(res)
        if(res.data.code == '1001'){
          that.setData({
            show:'',
            price:res.data.data
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          })
        }
      }
    }, user_id)
  }
})