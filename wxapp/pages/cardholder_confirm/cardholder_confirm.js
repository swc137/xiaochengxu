var api = require("../../utils/api.js")
Page({
  data:{
    checked:true,
    attachName:'',
    attachMobile:'',
    attachCertNo:'',
    applyUuid:'',
    attachUuid:'',
    submitdisabled:false
  },
  agreeCheck:function(){
    let chk = this.data.checked;
    if(chk){
      chk = false;
    }else{
      chk = true;
    }
    this.setData({
      checked: chk
    });
  },
  onLoad:function(options){
     this.setData({
       attachUuid:options.attachUuid,
       attachName:options.name,
       attachMobile:options.mobile,
       attachCertNo:options.certNo,
       applyUuid:options.applyuuid
    });
   
  },
  holderAttachSubmit:function(){
    var that = this;
     that.setData({
       submitdisabled:true
     })
       var formData = {
      applyUuid:this.data.applyUuid,
      attachUuid:this.data.attachUuid
    }
    
  
       api.holderAttachSubmit({
       data:formData,
       method:'POST',
       success:(res) =>{
         let result = res.data.status;
         if(result =="true"){
           let succTit="提交成功";
            wx.redirectTo({
            url: '../resultSucc/resultSucc?succTit='+succTit,
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
          
          });
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
  }
  
})