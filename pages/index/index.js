//Page Object
import{request} from"../../request/index.js";
Page({
  data:{
    //轮播图数组,发送异步请求给他赋值
    swiperList:[],
    //导航图  数组
    catesList:[],
    //楼层图  数组
    floorList:[],
  },
  //options(Object)
  onLoad: function(options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //     console.log(swiperList);
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });

    // request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    //   .then(result=>{
    //     this.setData({
    //       swiperList: result.data.message
    //       //console.log(111);
    //     })
    //     console.log(result.data.message);
    //   })
    this.getSwiperData();   
    this.getCateList(); 
    this.getfloorList();
  },
  //获取轮播图数据
  getSwiperData() {
    request({
      url: "/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperList: result
      });
      //console.log(swiperList);
      //？？？？不能打印，太神奇了 
     //console.log(111);//
    });
  },
  //获取分类导航数据
  getCateList() {
    request({
      url: "/home/catitems",
    }).then((result) => {
      this.setData({
        catesList: result
      });
    });
  },
  //获取楼层数据
  getfloorList() {
    request({
      url:"/home/floordata",
    }).then((result) => {
      this.setData({
        floorList: result
      });
    });
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  