var api = require("../../util/api.js")
var array = require("../../util/array.js")
// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    productList:[],
    imgUrl: api.imgUrl,
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:1000,
    categorys:'',
    productList: [],
    projectList:[]
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
    //首页轮播图
    api.getBanner({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          imgUrls: array.getBannerByArray(arr, 'image')
        })
      }
    });
    //获取一级分类
    api.getCategory({
      success: (res) =>{
        var arr = res.data.data;
        that.setData({
          categorys: arr
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
    }, 8, 1, '');
    //项目列表
    api.projectList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          projectList: arr
        })
      }
    }, 8, 1);
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
  //产品详情
  navigate: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  },
  //跳转到对应的产品列表
  toProject: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../projectDetail/projectDetail?product_id=' + id
    })
  },
  //跳转到下一级
  toCategory: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../category/category?id=' + id
    })
  },
  toMall:function(){
    wx.switchTab({
      url: '../mall/mall'
    })
  },
  toProduct: function () {
    wx.switchTab({
      url: '../product/product'
    })
  }
})