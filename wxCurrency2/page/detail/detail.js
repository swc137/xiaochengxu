var api = require('../../util/api.js')
var array = require('../../util/array.js')
var WxParse = require('../../wxParse/wxParse.js')
// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.imgUrl,
    interval: 3000,
    duration: 1000,
    product_id:'',
    detail: { 'info': [] },
    productDetail:'',
    topImg: '',
    title:'',
    price:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      product_id: options.product_id
    })
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
    var product_id = that.data.product_id;
    var imgUrl = that.data.imgUrl;
    //加载产品详情
    api.getProdectDetail({
      success: (res) => {
        var info = res.data.data;
        var storgeData = {};
        storgeData['md5_id'] = info.info.md5_id;
        storgeData['logo_img'] = imgUrl + info.logo_img.value;
        storgeData['price'] = info.price.value;
        storgeData['title'] = info.title.value;
        storgeData['num'] = 1;
        that.setData({
          productDetail: storgeData
        });
        var article = info.con_description.value.replace(/\/upload/g, imgUrl+'/upload');
        WxParse.wxParse('article', 'html', article, that, 0);
      }
    }, product_id);
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
  //加入购物车
  setCart:function(e){
    var that = this;
    var detail = that.data.detail;
    var productDetail = that.data.productDetail;

    try {
      var value = wx.getStorageSync('curriculum');
      if (value == '') {
        detail['info'].push(productDetail);
        that.setData({
          detail: detail
        })
      } else {
        if (value) {
          var length = value['info'].length;
          var flag = '0';
          for (var i = 0; i < length; i++) {
            if (productDetail['md5_id'] == value['info'][i]['md5_id']) {
              flag = '1';
              value['info'][i]['num'] = value['info'][i]['num'] + 1;
              that.setData({
                detail: value
              })
            }
          }
          if (flag == '0') {
            value['info'].push(productDetail);
            that.setData({
              detail: value
            })
          }
        }
      }

    } catch (e) {
    }

    try {
      wx.setStorageSync('curriculum', that.data.detail)
      wx.showToast({
        title: '加入购物车成功',
      })
    } catch (e) {
    }


  },
  toCart:function(e){
    wx.switchTab({
      url: '../shopCart/shopCart',
    })
  },
  buyNow:function(e){
    var that = this;
    var detail = that.data.detail;
    var productDetail = that.data.productDetail;

    try {
      var value = wx.getStorageSync('curriculum');
      if (value == '') {
        detail['info'].push(productDetail);
        that.setData({
          detail: detail
        })
      } else {
        if (value) {
          var length = value['info'].length;
          var flag = '0';
          for (var i = 0; i < length; i++) {
            if (productDetail['md5_id'] == value['info'][i]['md5_id']) {
              flag = '1';
              value['info'][i]['num'] = value['info'][i]['num'] + 1;
              that.setData({
                detail: value
              })
            }
          }
          if (flag == '0') {
            value['info'].push(productDetail);
            that.setData({
              detail: value
            })
          }
        }
      }

    } catch (e) {
    }

    try {
      wx.setStorageSync('curriculum', that.data.detail)
      wx.showToast({
        title: '加入购物车成功',
      })
    } catch (e) {
    }
    wx.switchTab({
      url: '../shopCart/shopCart',
    })
  },
  imgLoad:function(e){
    var that = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 695,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 695 / ratio;    //计算的高度值
    var image = this.data.imagesW;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    that.setData({
      imagesW: image
    })
  },
  //放大图片
  bigImg: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var image = that.data.images;
    var index = e.target.dataset.val;
    wx.previewImage({
      current: imgUrl + image[index], // 当前显示图片的http链接
      urls: [imgUrl + image[index]] // 需要预览的图片http链接列表
    })
  }
})