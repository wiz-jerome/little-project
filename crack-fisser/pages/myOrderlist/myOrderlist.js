// pages/myOrderlist/myOrderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[], // 订单列表
    currentTab: 100, // 选项卡默认

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageInit(100);
  },
  pageInit(status){
    var self = this;
    var data = {
      userId: 66,
      orderStatus: status
    }
    console.log('入参：' + data);
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/order/list',
      data: data,
      success: function (res) {
        console.log("成功的数据：" + JSON.stringify(res))
        self.setData({
          productList: res.data.data
        })
        
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  goOrderdetail(e){
    var orderNO = e.currentTarget.dataset.orderno
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderNO=' + orderNO,
    })
  },
  //点击切换
  clickTab: function (e) {
    console.log(e.target.dataset.current)
    this.pageInit(e.target.dataset.current);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }

})