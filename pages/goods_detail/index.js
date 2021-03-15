// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //清理缓存，只有点击一个商品之后才有数据
    const {goods_id}=options;
    this.getGoodsList(goods_id);
  },

  //获取商品详情数据
  async getGoodsList(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo=goodsObj;
    console.log(goodsObj);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //iphone不识别webp格式，
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },

  //点击轮播图放大预览
  handlePrevewImage(e){
    // 先构造要预览的数组
    const urls = this.GoodsInfo.pics.map((v) => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls,
    });
  },

  //点击加入购物车
  handleCartAdd(){
    
    var cart = wx.getStorageSync("cart") || [];
    //findIndex 查找符合条件的值，返回第一个符合的索引值，然后就不继续查找，
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    // var index = cart.findIndex(function (v) {
    //   return v.goods_id === this.GoodsInfo.goods_id;
    // });
    //判断是否存在
    if(index===-1){
      //不存在第一次添加
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo);
    }else{
      //存在
      cart[index].num++;
    }
    //把购物车重新添加到缓存中
    wx.setStorageSync("cart", cart);
  }
})