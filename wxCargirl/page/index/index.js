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
    menuActive:[true,false],
    productList:'',
    categoryList:'',
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
    //轮播图
    api.getBanner({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          imgUrls: array.getBannerByArray(arr, 'image')
        })
      }
    });

    //产品列表
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          productList: arr
        })
      }
    }, 10,1,'');

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
   * 跳转到产品列表
   */
  toMall:function(){
    wx.switchTab({
      url: '../mall/mall',
    })
  },
  //跳转到对应的分类
  toCateGory:function(e){
    var cateId = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../product/product?cateId=' + cateId + '&name='+name,
    })
  },
  //查看产品详情
  toDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  },
  //拨打电话
  callPhone: function (e) {
    var that = this
    var phone = that.data.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  //跳转到活动页面
  toActivity:function(e){
    wx.navigateTo({
      url: '../activity/activity',
    })
  }
})