/* 
  滚动条触底开始加载下一页数据
  获取总页数，当前页数，就知道现在是不是在最后一页
*/
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    //顶部tab栏
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:'true'
      },
      {
        id:1,
        value:'销量',
        isActive:'false'
      },
      {
        id:2,
        value:'价格',
        isActive:'false'
      },
    ],
    goodsList:[],
    totalPage: "",
  },
  // 接口要的参数，需要我们传递
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  //totalPages:1,
  // 写在data外面的值是不需要变化的参数，可以直接赋值进行传递
  //options(Object)
  onLoad: function(e) {
    this.QueryParams.cid=e.cid;
    //console.log(QueryParams);
    this.getGoodsList();
    
  },

  //获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    console.log(this.QueryParams);
    // const total=res.total;
    // this.totalPages = Math.ceil(total / this.Queryparams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      goodsList:res.goods
      //这里应该是个拼接
    })

    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
      
  },

  //标题点击事件，，是从子组件传递过来的
  handleItemTap(e){
    // 获取被点击的标题索引
    const {index}=e.detail;
    // 修改原数组，产生激活选中效果
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    //赋值
    this.setData({
      tabs
    })
  },

  //页面上滑，滚动条触底事件
  onReachBottom(){
    console.log('到底了');
    // 判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      //没有
      console.log('没有');
    }else{
      console.log('uo');
    }
  },

  //监听用户下拉动作
  onPullDownRefresh() {
    // 重置数据
    this.setData({
      goodList: [],
    });
    // 重置页码
    this.Queryparams.pagenum = 1;
    // 重新发送请求
    this.getGoodList();
  },
});
  