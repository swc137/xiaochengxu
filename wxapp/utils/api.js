const hostAddress = 'https://paymenttest.bankcomm.com/wxapp';
const wxRequest = (params,url) =>{
    var reqMethod = params.method || 'GET'
    wx.request({
      url: url,
      data: params.data || {},
      method: reqMethod, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
         //  'Accept':'application/json',
           'content-type':'application/x-www-form-urlencoded'
       }, // 设置请求的 header
      success: function(res){
          console.info(res.statusCode);
       if(params.success){
           params.success(res);
       }
      },
      fail: function(res) {
        if(params.fail){
            params.fail(res);
        }
      },
      complete: function(res) {
        if(params.complete){
            params.complete(res);
        }
      }
    });
};
    const getAttachPinYin = (params) =>{
        wxRequest(params,hostAddress+'/common/pinyin.json')
    };
    const getBaseCountry = (params) =>{
        wxRequest(params,hostAddress+'/attach/base/countrys.json')
    }
    const baseAttachSendDyCode = (params) =>{
        wxRequest(params,hostAddress+'/apply/attach/send/dycode.json')
    }
    const saveAttachBaseInfo = (params) =>{
        wxRequest(params,hostAddress+'/apply/attach/baseinfo/save.json')
    }
     const submitAttachInfo = (params) =>{
        wxRequest(params,hostAddress+'/apply/attach/submit.json')
    }
    const getVerifyCode = (params) =>{
       wxRequest(params,hostAddress+'/attach/cardHolder/sendDycode.json')
    }; 
    const validVerifyCode = (params) =>{
       wxRequest(params,hostAddress+'/attach/cardHolder/verifyDyCode.json')
    };  
    const sendNewCardDyCode = (params) =>{
       wxRequest(params,hostAddress+'/attach/newCard/sendDycode.json')
    };  
    const sendAttachInvitUrl = (params) =>{
         wxRequest(params,hostAddress+'/attach/newCard/sendInviteInfo.json')
        
    };   
     const holderAttachSubmit = (params) =>{
         wxRequest(params,hostAddress+'/attach/cardHolder/submit.json')
        
    };   
module.exports = {
    getAttachPinYin:getAttachPinYin,
    getBaseCountry:getBaseCountry,
    baseAttachSendDyCode:baseAttachSendDyCode,
    saveAttachBaseInfo:saveAttachBaseInfo,
    submitAttachInfo:submitAttachInfo,
    getVerifyCode:getVerifyCode,
    validVerifyCode:validVerifyCode,
    sendNewCardDyCode:sendNewCardDyCode,
    sendAttachInvitUrl:sendAttachInvitUrl,
    holderAttachSubmit:holderAttachSubmit

}
