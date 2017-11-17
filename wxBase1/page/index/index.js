var api = require("../../util/api.js")
var array = require("../../util/array.js")
// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    imgUrl: api.imgUrl,
    interval:3000,
    duration:1000,
    phone:'',
    longitude:'',
    latitude:'',
    address:'',
    companyName:'',
    companyDesc:'',
    productList:''
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
    //轮播图
    api.getBanner({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          imgUrls: array.getBannerByArray(arr, 'image')
        })
      }
    });
    //用户信息
    api.getSiteinfo({
      success: (res) => {
        var site_info = res.data.site_info;
        var user_info = res.data.user_info.sysadmin;
        var phone = user_info.mobile;
        var longitude = user_info.longitude;
        var latitude = user_info.latitude;
        var address = user_info.company_address;
        var companyName = user_info.company_name;
        var companyDesc = user_info.company_desc_text;
        that.setData({
          phone: phone,
          longitude: longitude,
          latitude: latitude,
          address: address,
          companyName: companyName,
          companyDesc: companyDesc
        })
      }
    });
    //加载产品列表
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          productList: arr
        })
      }
    }, 10, 1, '');
   
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 跳转到简介
   */
  toAbout:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  /**
   * 拨打电话
   */
  callPhone: function (e) {
    var phone = e.currentTarget.dataset.val;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 地图定位
   */
  toMap:function(e){
    var that = this;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var companyName = that.data.companyName;
    var address = that.data.address;
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: companyName,
      address: address
    })
  },
  /**
   * 跳转到产品列表
   */
  toProductList:function(){
    wx.navigateTo({
      url: '../product/product',
    })
  },
  navigate: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  }


})