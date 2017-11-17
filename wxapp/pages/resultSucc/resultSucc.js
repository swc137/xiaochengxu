// pages/resultSucc/resultSucc.js
Page({
  data:{
    succTit:"快点击右上角分享给TA吧",
    desc:"说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字",
    uuid:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      uuid:options.uuid
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onShareAppMessage: function () {
    return {
    	  title: '撒娇卡活动',
          desc: '撒娇卡活动强势来袭',
          path: 'pages/cardholder/cardholder?uuid='+this.data.uuid
    }
  }
})