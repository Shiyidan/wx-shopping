import { request } from "../../request/index.js";
Page({
  data: {
    leftMenyList:[],
    reghtContent:[],
    currentIndex:0,
    scrollTop:0
  },
  Cates:[],
  //定义在外面，全局变量
  //options(Object)
  onLoad: function(options) {
    //1.获取本地存储中的数据，小程序中也存在本地存储技术，web端用localStroage.getItem
    const Cates=wx.getStorageInfoSync("cates");
    //2.判断，不存在时发送请求获取数据。浏览器中Storage可以看是否有缓存
    if(!Cates){
      this.getCarts();
      console.log("不存在");
    }else{
      //有旧的数据，但是要判断过没过期，定义过期时间，10s
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();
      }else{
        console.log('可以使用旧数据');
        this.Cates=Cates.data;
        //拿到数据再次渲染左侧和右侧，依然不好使！！
        // let leftMenuList=Cates.map((v) => v.cat_name);
        // let rightContent=Cates[0].children;
        // this.setData({
        //   leftMenuList,
        //   rightContent
        // })
      }
    }
    this.getCates();
  },
  // 获取分类数据
  getCates (){
    request({
      url:"/categories"
    })
      .then(res=> {
        //console.log(res);
        let Cates=this.Cates;
        Cates=res;
        //console.log(Cates);
        //把接口的数据存入到本地存储中
        wx.setStorageSync("cates", { time: Date.now(), data: this.CartData });
        //左侧数据
        let leftMenuList=Cates.map((v) => v.cat_name);
        // console.log(leftMenuList);
        let rightContent=Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
        //console.log(res);
        return res;
      })
  },
  //var Cates=new getCates;
  //点击事件
  handleItemTap(e){
    //console.log(e);
    let Cates=this.getCates();
    
    console.log(Cates);
    // 获取被点击标题的索引，给data中的currentIndex赋值就行了
    //根据当前点击的标题，确定右侧展示第几个索引的children
    const {index}=e.currentTarget.dataset;
    let rightContent=Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop  //重新设置右侧内容scroll-view标签距离顶部的值，也就是每次都是0
    }) 
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
  