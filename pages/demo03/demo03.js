// pages/demo03/demo03.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:[]
  },
  //输入框的input事件   e事件对象参数，触发时默认传入
  handleInput(e){
    console.log(e);
    console.log(e.detail.value);
    console.log(111);
    this.setData({
      num:e.detail.value
    })
  },
  handletap(e){
    console.log(e);
    const operation=e.currentTarget.dataset.operation
    this.setData({
      num:(this.data.num+operation)*1
      // num:this.data.num+operation
    })
  }
})