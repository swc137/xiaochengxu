var app=getApp()
var api = require("../../utils/api.js")
const baseUrl = "https://paymenttest.bankcomm.com/wxapp";
Page({
  data:{
    tempFilePaths:'',
    tempFilePaths1:'http://paymenttest.bankcomm.com/app/mobile1/wximg/sjk/card_back.jpg',
        applyuuid:'',
    showModal:true,
    popIsHide:true,
    epopIsHide:true,
    submitdisabled:false,
    isSSON:'',
    imageLoad:true
  },

  onLoad:function(options){
    const uuid = options.uuid;
    const isSSON = options.isSSON == "true"?true:false;
    if(options.isUploadFront =="true"){
         this.setData({
                      tempFilePaths:baseUrl+"/attach/image/imgpreview.html?userUuid="+uuid+"&imageType=1"+"&v="+new Date().getTime()
                    })
    }
    if(isSSON && options.isUploadBack=="true"){
       this.setData({
                    tempFilePaths1:baseUrl+"/attach/image/imgpreview.html?userUuid="+uuid+"&imageType=2"+"&v="+new Date().getTime()
                    })
    }
    console.info(uuid);
    console.info("isSSON:" + isSSON  +"  " + typeof(isSSON));
    this.setData({
        applyuuid:uuid,
        isSSON:isSSON
    })

  },

  showPop:function(){
  
        let that = this;
         that.setData({
           submitdisabled:true
        })
      
        let params = {
          applyUuid:that.data.applyuuid
        };
       
        api.submitAttachInfo({
          data:params,
          success:(res) =>{
            if(res.data.status =='true') {
              wx.removeStorageSync('attachCacheInfo');
            console.info("提交成功成功");
               console.info(res.data.applyUuid);
           wx.redirectTo({
            url: '../resultSucc/resultSucc?uuid='+res.data.applyUuid,
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
              // complete
            }
          });
    
          } else {
            that.setData({
                submitdisabled:false
              })
            that.showTips(res.data.errorMsg);
            
          }
           } 
        })

  },
  hidePop:function(){
      this.setData({
          showModal:true,
          popIsHide:true
      })
  },
  chooseFrontImg:function(){
    var that = this
    that.chooseImg({
        succ:(path)=>{

           //that.setData({
             //tempFilePaths:path
           //})
           if(that.validImageSize(path,that)){
            that.imageUpload({
              path:path,
              that:that,
              imageType:"1", //正面
              succ:(path)=>{
                  that.setData({
                    tempFilePaths:path
                  })
              }
            })
           };
        }
    })
  },
  chooseBackImg:function(){
    var that = this
    that.chooseImg({
        succ:(tmpPath)=>{
          //  that.setData({
          //    tempFilePaths1:tmpPath
         //   })
            that.imageUpload({
              path:tmpPath,
              imageType:"2", //反面
              that:that,
              succ:(path)=>{
                    that.setData({
                      tempFilePaths1:path
                    })
              }
            })
        }
    })
  },
  chooseImg:function(param){
    var that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        console.info(res.tempFilePaths)
        param.succ(res.tempFilePaths)
      },
      fail: function() {
      }
    })
  },
  imageUpload(param){
      let that = param.that
      var upUuid = that.data.applyuuid;
      var imageType = param.imageType;
 
     // if(that.validImageSize(param,that)){
      //  console.info("-----");
     //   return;
     // }
      that.setData({
        imageLoad:false
      })
      console.info(imageType);
      wx.uploadFile({
          url: baseUrl+'/attach/image/upload.json',
          filePath:param.path[0],
          name:'file',
          header: {
            'content-type':'multipart/form-data'
          }, // 设置请求的 heade
          formData: {
            'userUuid':upUuid,
            'imageType':imageType,
            'thirdSession':wx.getStorageSync('thirdSession'),
            'signature':app.globalData.signature,
            'rawData':app.globalData.rawData
          }, // HTTP 请求中其他额外的 form data
          success: function(res){
              console.info(res.data.isSuccess)
              var data = JSON.parse(res.data)
              if(data.isSuccess =='true'){
             let path = baseUrl+"/attach/image/imgpreview.html?userUuid="+upUuid+"&imageType="+imageType+"&v="+new Date().getTime()
              param.succ(path)
              that.setData({
                imageLoad:true
               })
              console.info("上传成功")
              } else{
                   that.setData({
                    imageLoad:true
                   })
                   if(data.isRedirect =="true"){
                     console.info("跳转到错误页面。");
                     wx.redirectTo({
                       url: '../resultFail/resultFail?desc='+data.errorMsg
                     })
                   }else{
                     that.showTips(data.errorMsg);
                   }
              }
             
            },
            fail: function(res) {
              that.showTips("上传失败，请稍后重试！");
               that.setData({
                 imageLoad:true
              })
                console.info(e)
                console.info("上传失败")
            }
        })
    },

  showEpop:function(){
      this.setData({
        epopIsHide:false
      })
  },
  //关闭范例弹框
  closeEpop:function(){
      this.setData({
        epopIsHide:true
      })
  },
  //判断上传图片的大小
  validImageSize:function(tmpPath,that){
    var isValid = true;
    wx.getSavedFileInfo({
      filePath: tmpPath[0],
      success: function(res){
        var imageSize = res.size;
        if(imageSize<122880 || imageSize>4194304){
          that.showTips("您上传的照片大小应在120KB到4M之间。");
          console.info(imageSize);
          isValid = false;
        }
      
      }
     
    })
    return isValid;
  },
       //设置错误信息
  showTips:function(msg){
    var tips = msg || '系统忙，请稍后重试！'
      wx.showModal({
                  title: '',
                  showCancel:false,
                  content: tips,
                  success: function(res) {
                  },
                  complete: function(res){
                    
                  }
    })
  }


})