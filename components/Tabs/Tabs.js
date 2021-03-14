// components/tabs/tabs.wxml.js
Component({
  /**
   * 组件的属性列表
   */
  //存放着要接收的父组件的值
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 定义点击事件
    handleItemTap(e){
      const {index}=e.currentTarget.dataset;
      // 触发父组件中的事件，自定义
      this.triggerEvent("tabsItemChange",{index});
    }
  }
})
