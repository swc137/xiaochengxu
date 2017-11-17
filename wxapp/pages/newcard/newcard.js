var dateUtil = require("../../utils/util.js")
var arrayUtil = require("../../utils/array.js")
var valid = require("../../utils/valid.js")
var api = require("../../utils/api.js")
var bubb = require("../../components/bubblePop.js")
var sendCode = require("../../utils/sendByCode.js")
var app = getApp()
Page({
  data:{
     mobileNo:'',
     verifyCode:'',
     errorMsg:true,
     promptText:'',
     dycodeInfo:'发送',
     coundown:60,
     sendCodeState:false,
     submitdisabled:false,
     bubIsHide:true,
     globals:[],
     applyUuid:'',
     dyFun:12 //动码功能码
  },
  onLoad:function(options){
      applyUuid = options.uuid;
  },
  onReady:function(){
    // 页面渲染完成
     this.animation = wx.createAnimation({
      timingFunction: 'linear'
    })
  },
  onShow:function(){
      app.getUserInfo(function(userInfo){});
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //手机号
  mobileNoInput:function(e){
    var that = this
    that.setData({
      mobileNo:e.detail.value
    }) 
  },
  //验证码
  verifyCodeInput:function(e){
    var that = this
    that.setData({
      verifyCode:e.detail.value
    }) 
  },
 
  //获取短信验证码事件处理
  getVerifyCode: function(){
    var that = this;
    that.setData({
       promptText:this.mobileNoValid()
      })
    if(that.data.promptText !=''){ 
      that.setData({
        errorMsg:false
      })
       bubb.popBubble(that);
    }
    if(that.data.promptText ==''){ 
     
      let params = {
         mobile:this.data.mobileNo,
         dyFun:this.data.dyFun,
         applyUuid:this.data.applyUuid,
         loginCode:app.globalData.loginCode,
         sessionId:wx.getStorageSync('thirdSession')
      };
      sendCode.sendByCode(that); 
      api.sendNewCardDyCode({
        data:params,
        method:'POST',
        success:(res) =>{
          console.info(res.data.verifyCode)
          if(res.data.status !="true"){
        	    sendCode.cleanDyInfo(that);
        	    if(res.data.isRedirect =="true"){
		             this.holderShowTips();
        	    }else if(res.data.isQuit == "true"){
		             wx.redirectTo({
		        	        url: '../resultFail/resultFail?desc='+res.data.message
		             })
        	    }else{
	        	      that.showTips(res.data.message);
        	    }
          }else{
               wx.setStorageSync('thirdSession', res.data.thirdSession);
               console.info("动码发送成功")
          }
        },
      })
      }
  },
  mobileNoValid:function(e){
    var promptText = "";
    if(valid.required(this.data.mobileNo)){
      promptText="请输入手机号码";
      return promptText;
    }
     if(!valid.isMobile(this.data.mobileNo)){
       promptText="您输入的手机号含非数字内容、空格或不存在"
       return promptText; 
    }
    if(!valid.verifyMobileLength(this.data.mobileNo,11)){
       promptText="您输入的手机号位数有误"
       return promptText; 
    }
     return promptText; 
  },
   //表单提交
  bindFormSubmit:function(e){

    var that = this
     that.setData({
       errorMsg:true,
       submitdisabled:true
     })
    var mainCardName = null;
    if(e.detail.value !=null){
     that.setData({
       promptText:that.validForm(e.detail.value,that)
      })
    }
   if(that.data.promptText !=''){
     that.setData({
       errorMsg:false
     })
      bubb.popBubble(that)
   }
  if(that.data.errorMsg){
     that.formInit(that,e.detail.value)
  }
  
   },
  validForm:function(formvalue,that){
    var promptText = "";
     //手机号码校验
    var mobileNo = formvalue.mobileNo;
    if(valid.required(mobileNo)){
      promptText="请输入手机号码";
      return promptText;
    }
    if(!valid.isMobile(mobileNo)){
       promptText="您输入的手机号含非数字内容、空格或不存在"
       return promptText; 
    }
    if(!valid.verifyMobileLength(mobileNo,11)){
       promptText="您输入的手机号位数有误"
       return promptText; 
    }
    //短信验证码校验
    var verifyCode = formvalue.verifyCode;
    if(valid.required(verifyCode)){
       promptText="请输入6位数字验证码"
       return promptText; 
    }
    if(!valid.dyCode(verifyCode)){
       promptText="请输入6位数字验证码"
       return promptText; 
    }
    
    return promptText;
  },
  errormsgconfirm:function(){
    var that = this
    that.setData({
      errorMsg:true,
      submitdisabled:false
    })
   },
    
   formInit:function(that,formvalue){
    var formData = {
      applyUuid:that.data.applyUuid,
      mobile:formvalue.mobileNo,
      dyCode:formvalue.verifyCode,
      dyFun:that.data.dyFun,
      iv:app.globalData.iv,
      encryptedData:app.globalData.encryptedData,
      thirdSession:wx.getStorageSync('thirdSession')
    }
    api.sendAttachInvitUrl({
      data:formData,
       method:'POST',
      success:(res) =>{
        if(res.data.status =="true"){
          wx.redirectTo({
        	  url: '../holderSucc/holderSucc',
                 success: function(res){
                      that.setData({
                    submitdisabled:false
                    })
                  },
                  fail: function() {
                    that.setData({
                        submitdisabled:false
                        })
                  },
                  complete: function() {
                  
                  }
          })
        } else{
          that.showTips(res.data.message,that);
        }
      
       
      }
    });
   },
   //设置错误信息
  showTips:function(msg,that){
    var tips = msg || '系统忙，请稍后重试！'
      wx.showModal({
                  title: '',
                  showCancel:false,
                  content: tips,
                  success: function(res) {
                  },
                  complete: function(res){
                     that.setData({
                        submitdisabled:false
                        })
                  }
    })
  },
     //设置错误信息
  holderShowTips:function(){
    var tips = '您已是交行卡用户，请至持卡通道进行办理'
      wx.showModal({
                  title: '',
                  showCancel:false,
                  content: tips,
                  success: function(res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../cardholder/cardholder?uuid='+res.data.applyUuid,
                        
                      })
                    }
                  },
                  complete: function(res){
                     that.setData({
                        submitdisabled:false
                        })
                  }
    })
  }
})