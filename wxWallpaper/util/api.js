const imgUrl = 'https://xiaochengxu.zhuniu.com';
const hostAddress = 'https://xiaochengxu.zhuniu.com/api';
const token = '55204e241819fac45ca44f1af2aad123';
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
  wxRequest(params, hostAddress + '/product_list?pagesize=' + pagesize + '&&page=' + page + '&&token=' + token + '&&category_id=' + category_id)
};
//获取产品详情
const getProdectDetail = (params,product_id) => {
  wxRequest(params, hostAddress + '/product_detail?product_id=' + product_id + '&&token=' + token)
};
//获取菜单详情
const getNavDetail = (params, page_name) => {
  wxRequest(params, hostAddress + '/page?page_name=' + page_name + '&&token=' + token)
};
//获取分类下的产品列表
const getProductById = (params, id) => {
  wxRequest(params, hostAddress + '/product_list?pagesize=100&page=1&token=' + token + '&type=1&category_id=' + id)
};
//获取新闻资讯
const getNews = (params, tuijian) => {
  wxRequest(params, hostAddress + '/news_list?token=' + token + '&tuijian=' + tuijian)
};
//获取新闻详情
const getNewsDetail = (params, news_id) => {
  wxRequest(params, hostAddress + '/news_detail?token=' + token + '&id=' + news_id)
};
 
module.exports = {
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  getNavDetail: getNavDetail,
  imgUrl: imgUrl,
  getProductById: getProductById,
  getNews: getNews,
  getNewsDetail: getNewsDetail
}
