// page/order/order.js
const api = require('../../util/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressDetail:'',
    address_id:'',
    user_id:'',
    productList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var address_id = options.address_id;
    if (address_id != undefined){
      that.setData({
        address_id: address_id
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
    var info = { 'user_id': '' };
    var address_id = that.data.address_id;
    //用户ID
    wx.getStorage({
      key: 'data',
      success: function (res) {
        info['user_id'] = res.data;
        that.setData({
          user_id: res.data
        })
        if (address_id != ""){
          var user_id = that.data.user_id;
          var addInfo = { 'user_id': user_id, 'address_id': address_id };
          api.addressDetail({
            data: addInfo,
            method: 'POST',
            success: (res) => {
              var arr = res.data.data;
              var arrDetail = [arr.province, arr.city, arr.area];
              that.setData({
                addressDetail: arr
              })
            }
          });
        }else{
          api.addressList({
            method: 'POST',
            data: info,
            success: (res) => {
              var arr = res.data.data;
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].is_default == '1') {
                  that.setData({
                    addressDetail: arr[i],
                    address_id: arr[i].id
                  })
                }
              }
            }
          });
        }
      }
    })

    //购物车信息
    wx.getStorage({
      key: 'curriculum',
      success: function (res) {
        var arr = res.data;
        console.log(arr)
        that.setData({
          productList: arr
        })
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
  //选择地址
  toSelectAddress:function(){
    wx.redirectTo({
      url: '../addressChange/addressChange',
    })
  },
  //去支付
  toPay:function(e){
    var that = this;
    var product_id = [];
    var num = [];
    var productList = that.data.productList;
    for (var i = 0; i < productList.info.length; i++) {
      product_id.push(productList.info[i].md5_id);
      num.push(productList.info[i].num);
    }
    var info;
    try {
      var value = wx.getStorageSync('data')
      if (value) {
        info = {
          'real_name': that.data.addressDetail.username,
          'mobile': that.data.addressDetail.mobile,
          'province': that.data.addressDetail.province,
          'city': that.data.addressDetail.city,
          'area': that.data.addressDetail.area,
          'address': that.data.addressDetail.address,
          'product_id': product_id.toString(),
          'num': num.toString(),
          'user_id': value
        };
      }
    } catch (e) {
      // Do something when catch error
    }
    
    api.toPay({
      method: 'POST',
      data: info,
      success: (res) => {
        try {
          wx.removeStorageSync('curriculum');
        } catch (e) {
          // Do something when catch error
        }
        //console.log(res.aa);
        wx.requestPayment({
          'timeStamp': '',
          'nonceStr': '',
          'package': '',
          'signType': 'MD5',
          'paySign': '',
          'success': function (res) {
          },
          'fail': function (res) {
          }
        })
      }
    })
    
  }
})