// page/result/result.js
var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result_txt:'',
    user_id:'',
    h_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    try {
      var value = wx.getStorageSync('data');
      if (value != '') {
        that.setData({
          user_id:value
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请先授权登录',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    }catch(e){
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
    var user_id = that.data.user_id;
    api.getPrize({
      success: (res) => {
        //  console.log(res)
        var info = res.data.data;
        var txt = "";
        if (res.data.code == '1001') {
          txt = info.name;
        } else if (res.data.code == '3001') {
          wx.showModal({
            title: '提示',
            content: '您已经领取过',
            showCancel: false,
            success: function (res) {
            }
          })
          txt = info.prize_info.name;
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          })
          txt = '请重试';
        }
        that.setData({
          result_txt: txt
        })
      }
    }, user_id);

    //创建活动
    api.createAct({
      success: (res) => {
        if (res.data.code == '1001') {
          that.setData({
            h_id: res.data.data
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          })
        }
      }
    }, user_id);
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
  onShareAppMessage: function (res) {
    var that = this;
    var user_id = that.data.user_id;
    var h_id = that.data.h_id;
    return {
      title: '呼朋唤友来砍价',
      desc: '呼朋唤友来砍价',
      imageUrl:'../../image/public/act.jpg',
      path: '/page/share/share?h_id=' + h_id,
      success: function (res) {
        // 转发成功
        try {
          wx.setStorageSync('share', h_id)
        } catch (e) {
        }
      },
      fail: function (res) {
        // 转发失败
      }
    }
    
  }
})