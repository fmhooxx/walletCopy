module.exports = {
  //系统
  domain: {
    // api: 'https://xdkss.gup-group.cn/',
    // 'api': 'http://192.168.110.100:8085/' // 章
    // 'api': 'http://192.168.110.101:34668/' // 卜hn
    // 'file' : 'https://liuda.nyakarlek.cn/'
    // 'api':'http://192.168.110.104:8085/' // 李
    // api: 'http://192.168.110.101:8085/',
    // api: 'https://api.gup-go.club/',
    'api': 'https://portalapi.gup-go.club/', // 正式
    // 'api': 'https://portaltestapi.gup-go.club/' // 测试
    // btc: 'https://api.blockcypher.com/v1/btc/test3/'
    // api: 'https://api.blockchair.com/'
  },
  //后台的api接口
  url: {
    share: 'https://portal.gup-go.club/',
    // share: 'http://192.168.1.177:8080/',
    //退货
    returnGoods: {
      //退货申请时候的上传图片信息接口
      uploadMainInfo: 'returnGoods/uploadMainInfo',
    },
  },
};