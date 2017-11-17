var api = require('../../util/api.js')
// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    productDetail:'',
    imgUrl: api.imgUrl,
    content: [],
    detail : { 'info': [] },
    over:'hidden'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
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
    var id = that.data.id;
    //课程详情
    api.getProdectDetail({
      success: (res) => {
        var arr = res.data.data;
        var content = arr.description.replace(/<p>/g, '').split(/<\/p>/g);
        arr['num'] = 1;
        that.setData({
          productDetail: arr,
          content: content
        })
      }
    }, id);
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
  //购物车
  toCart:function(){
    wx.switchTab({
      url: '../shopCart/shopCart'
    })
  },
  //加入购物车
  setCart:function(){
    var that = this;
    var detail = that.data.detail;
    var productDetail = that.data.productDetail;

    try {
      var value = wx.getStorageSync('curriculum');
      if(value == ''){
        detail['info'].push(productDetail);
        that.setData({
          detail: detail
        })
      }else{
        if (value) {
          var length = value['info'].length;
          var flag = '0';
          for (var i = 0; i < length; i++) {
            if (productDetail['id'] == value['info'][i]['id']) {
              flag = '1';
              value['info'][i]['num'] = value['info'][i]['num'] + 1;
              that.setData({
                detail: value
              })
            }
          }
          if(flag == '0'){
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
      wx.showModal({
        title: '提示',
        content: '加入购物车成功!',
        confirmText:'去购物车',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../shopCart/shopCart',
            })
          } else if (res.cancel) {
          }
        }
      })
    } catch (e) {
    }
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