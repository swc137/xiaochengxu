const imgUrl = 'https://xiaochengxu2.zhuniu.com';
const hostAddress = 'https://xiaochengxu2.zhuniu.com/api';
const token = '8f62bf4ab61bc044135046165ccd2acd';
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
  wxRequest(params, hostAddress + '/banner?token=' + token)
};
//获取产品分类
const getCategory = (params) => {
  wxRequest(params, hostAddress + '/category?token=' + token)
};
//获取产品列表
const getProductList = (params, pagesize, page, category_id) => {
  wxRequest(params, hostAddress + '/product_list?pagesize=' + pagesize + '&type=1&page=' + page + '&token=' + token + '&category_id=' + category_id)
};
//获取产品详情
const getProdectDetail = (params,product_id) => {
  wxRequest(params, hostAddress + '/product_detail?product_id=' + product_id + '&token=' + token)
};
//获取网站详情
const getSiteinfo = (params) => {
  wxRequest(params, hostAddress + '/site_info?token=' + token)
};
 
module.exports = {
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  imgUrl: imgUrl,
  getSiteinfo: getSiteinfo
}
