var app = getApp()
var api = require("../../utils/api.js")
Page({
    onLoad:function(options){
    },
    onReady:function(){
    },
   onShareAppMessage: function () {
    return {
    	  title: '撒娇卡活动',
          desc: '撒娇卡活动强势来袭',
          path: 'pages/banner/banner'
    }
  },
  onShow:function(){
   //  app.getUserInfo(function(userInfo){})
     wx.checkSession({
    success: function(){
        //登录态未过期
        console.info("用户登录信息未过期");
    },
    fail: function(){
        //登录态过期
    //  wx.login()
      console.info("用户登录信息已过期");
    }
     
})
  },
    apply:function(){
   
        wx.navigateTo({
            url: '../attach/attach'
        })
    }
})