var api = require('../../util/api.js')
var array = require('../../util/array.js')
// product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    imgUrl: api.imgUrl,
    pagesize:80,
    page:1,
    noData:'hidden',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var name = options.name;
    that.setData({
      id:id
    })
    wx.setNavigationBarTitle({
      title: name
    });
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
    var pagesize = that.data.pagesize;
    var page = that.data.page;
    var id = that.data.id;
    //加载产品列表(分页)
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          productList: arr
        })
      }
    }, pagesize, page,id);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    that.setData({
      page: 1,
      noData:'hidden',
      index:0,
      pickerId: [''],
      categoryArr: ['全部']
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
    var that = this;
    var pagesize = that.data.pagesize;
    var page = that.data.page + 1;
    var index = that.data.index;
    var id = that.data.id;
    that.setData({
      page: page
    });
    //加载产品列表(分页)
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        var productList = that.data.productList;
        for(var i = 0;i<arr.length;i++){
          productList.push(arr[i]);
        }
        that.setData({
          productList: productList
        })
      }
    }, pagesize, page, id);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  navigate:function(e){
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  }
})