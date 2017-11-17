const imgUrl = 'https://xiaochengxu2.zhuniu.com';
const hostAddress = 'https://xiaochengxu2.zhuniu.com';
const token = 'ed62d604adcdff34900ec3e381823c50';
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
          //console.info(res);
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
//获取轮播图
const getBanner = (params) =>{
  wxRequest(params, hostAddress + '/api/banner?token=' + token)
};
//获取产品分类
const getCategory = (params) => {
  wxRequest(params, hostAddress + '/api/category?token=' + token)
};
//获取产品列表
const getProductList = (params, pagesize, page, category_id) => {
  wxRequest(params, hostAddress + '/api/product_list?pagesize=' + pagesize + '&page=' + page + '&token=' + token + '&type=1&category_id=' + category_id)
};
//获取产品详情
const getProdectDetail = (params,product_id) => {
  wxRequest(params, hostAddress + '/api/product_detail?product_id=' + product_id + '&token=' + token)
};
//获取网站详情
const getSiteinfo = (params) => {
  wxRequest(params, hostAddress + '/api/site_info?token=' + token)
};
//提交表单
const forSubmit = (params) => {
  wxRequest(params, hostAddress + '/gouche/add_gouche?token=' + token)
};
//抽奖
const getPrize = (params, user_id) => {
  wxRequest(params, hostAddress + '/prize/get_prize?token=' + token + '&user_id=' + user_id)
};
//创建活动
const createAct = (params,user_id) => {
  wxRequest(params, hostAddress + '/kanjia/create_huodong?token=' + token + '&user_id=' + user_id)
};
//获取活动详情
const getActInfo = (params) => {
  wxRequest(params, hostAddress + '/kanjia/get_info?token=' + token)
};
//砍价
const toPrice = (params, user_id) => {
  wxRequest(params, hostAddress + '/kanjia/save_price?token=' + token + '&user_id='+user_id)
};
//保存信息
const toSaveInfo = (params, user_id) => {
  wxRequest(params, hostAddress + '/mini/save_user_info?token=' + token)
};
//保存手机号
const toSavePhone = (params, user_id) => {
  wxRequest(params, hostAddress + '/mini/save_user_phone?token=' + token)
};

module.exports = {
  token:token,
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  imgUrl: imgUrl,
  hostAddress: hostAddress,
  getSiteinfo: getSiteinfo,
  forSubmit:forSubmit,
  getPrize: getPrize,
  createAct: createAct,
  getActInfo: getActInfo,
  toPrice: toPrice,
  toSaveInfo: toSaveInfo,
  toSavePhone: toSavePhone
}
