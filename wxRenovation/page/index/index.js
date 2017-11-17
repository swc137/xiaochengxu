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
    personList:[],
    imgUrl: api.imgUrl,
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:1000,
    accessoryImg: []
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
    //公司案列
    api.getProductList({
      success:(res)=>{
        var arr = res.data.data;
        that.setData({
          productList: arr
        })
      }
    },6,1,136);

    //设计师
    api.getDesgin({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          personList: arr
        })
      }
    }, 4);
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
  navigate:function(e){
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id='+id
    })
  },
  designerDetails: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../designDetail/designDetail?id=' + id
    })
  },
  //更多案例
  moreCase:function(e){
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../product/product?name='+name+'&id=' + id
    })
  },
  //更多设计师
  morePerson:function(e){
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../person/person?name=' + name + '&id=' + id
    })
  },
  //联系我们
  toContact:function(){
    wx.switchTab({
      url: '../about/about',
    })
  },
  //跳转公司简介
  toAct: function (e) {
    wx.navigateTo({
      url: '../nav/nav'
    })
  }, 
})