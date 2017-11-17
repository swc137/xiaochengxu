const imgUrl = 'https://xiaochengxu2.zhuniu.com';
const hostAddress = 'https://xiaochengxu2.zhuniu.com';
const token = '3109a7d8a4dd15568a73361a3bba9d9f';
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
  wxRequest(params, hostAddress + '/api/product_list?pagesize=' + pagesize + '&page=' + page + '&token=' + token + '&category_id=' + category_id + '&type=1')
};
//获取产品详情
const getProdectDetail = (params,product_id) => {
  wxRequest(params, hostAddress + '/api/product_detail?product_id=' + product_id + '&token=' + token)
};
//获取菜单详情
const getNavDetail = (params, page_name) => {
  wxRequest(params, hostAddress + '/api/page?page_name=' + page_name + '&token=' + token)
};
//获取网站详情
const getSiteinfo = (params) => {
  wxRequest(params, hostAddress + '/api/site_info?token=' + token)
};
//首页广告位
const getIndexBanner = (params, position) => {
  wxRequest(params, hostAddress + '/api/stand?token=' + token + '&position=' + position)
};

module.exports = {
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  getNavDetail: getNavDetail,
  imgUrl: imgUrl,
  getIndexBanner: getIndexBanner,
  getSiteinfo: getSiteinfo
}
