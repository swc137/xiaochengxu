const imgUrl = 'https://xiaochengxu2.zhuniu.com';
const hostAddress = 'https://xiaochengxu2.zhuniu.com';
const token = 'abe9d93ccd9f41cb3b65919418d90f88';
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
//获取首页分类
const getIndexCate = (params) => {
  wxRequest(params, hostAddress + '/api/stand?pagesize=10&page=1&token=' + token + '&position=po_home')
};
//保存地址
const saveAddress = (params) => {
  wxRequest(params, hostAddress + '/member/save_address?token=' + token)
};
//地址列表
const addressList = (params) => {
  wxRequest(params, hostAddress + '/member/user_address?token=' + token)
};
//设为默认
const setDefault = (params) => {
  wxRequest(params, hostAddress + '/member/set_default_address?token=' + token)
};
//删除地址
const deteleAddress = (params) => {
  wxRequest(params, hostAddress + '/member/delete_address?token=' + token)
};
//地址详情
const addressDetail = (params) => {
  wxRequest(params, hostAddress + '/member/get_address_info?token=' + token)
};
//订单列表
const orderList = (params) => {
  wxRequest(params, hostAddress + '/order/order_list?token=' + token)
};
//取消订单
const cancelOrder = (params) => {
  wxRequest(params, hostAddress + '/order/set_order_status?token=' + token)
};
//订单详情
const orderDetail = (params) => {
  wxRequest(params, hostAddress + '/order/order_detail?token=' + token)
};
//获取网站详情
const getSiteinfo = (params) => {
  wxRequest(params, hostAddress + '/api/site_info?token=' + token)
};
//pay/wx_pay
const toPay = (params) => {
  wxRequest(params, hostAddress + '/pay/wx_pay?token=' + token)
};

module.exports = {
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  imgUrl: imgUrl,
  hostAddress: hostAddress,
  getIndexCate: getIndexCate,
  saveAddress: saveAddress,
  addressList: addressList,
  setDefault: setDefault,
  deteleAddress: deteleAddress,
  addressDetail: addressDetail,
  orderList: orderList,
  getSiteinfo: getSiteinfo,
  cancelOrder: cancelOrder,
  orderDetail: orderDetail,
  toPay: toPay
}
