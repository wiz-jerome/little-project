// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    allarray: {},
    allCityarray: {},
    cityarray: [],
    areaarray: [],
    index: 0,
    cityindex: 0,
    areaindex: 0,
  },
  onShow: function () {
    console.log('onshow!!!');
    this.getProvince();
  },
  bindPickerChange: function (e) {
    console.log(e)
    console.log('省发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.getCity();
  },
  bindcityChange: function (e) {
    console.log(e)
    console.log('市发送选择改变，携带值为', e.detail.value)
    this.setData({
      cityarray: e.detail.value
    })
    this.getArea();
  },
  bindareaChange: function (e) {
    console.log(e)
    console.log(' 区发送选择改变，携带值为', e.detail.value)
    this.setData({
      areaarray: e.detail.value
    })
  },
  // 设为默认
  switchChange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  // 获取省
  getProvince() {
    var self = this;
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/commonData/getProvince',
      method: 'GET',
      success: function (res) {
        console.log("省市成功的数据：" + JSON.stringify(res))
        var arr = [];
        const length = res.data.data.length;
        for (let i = 0; i < length; ++i) {
          arr.push(res.data.data[i].areaName)
        }
        self.setData({
          array: arr,
          allarray: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 获取市
  getCity(e) {
    var self = this;
    var idx = this.data.index;

    console.log(this.data.allarray)
    var parentId = this.data.allarray[idx].areaCode;
    console.log(this.data.allarray[idx].areaCode);
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/commonData/getCity?parentId=' + parentId,
      method: 'GET',
      success: function (res) {
        console.log("城市成功的数据：" + JSON.stringify(res))
        // var objArray = [];
        var arr = [];
        const length = res.data.data.length;
        for (let i = 0; i < length; ++i) {
          arr.push(res.data.data[i].areaName);
        }
        self.setData({
          cityarray: arr,
          allCityarray: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 获取区
  getArea(e) {
    var self = this;
    var idx = this.data.cityindex;
    var parentId = this.data.allCityarray[idx].areaCode;
    console.log(this.data.allCityarray[idx].areaCode);
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/commonData/getDistrict?parentId=' + parentId,
      method: 'GET',
      success: function (res) {
        console.log("区域成功的数据：" + JSON.stringify(res))
        var objArray = [];
        var arr = [];
        const length = res.data.data.length;
        for (let i = 0; i < length; ++i) {
          arr.push(res.data.data[i].areaName);
        }
        self.setData({
          areaarray: arr
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 新增地址
  insertAddress() {
    var parms = {};
    // parms = {
    //   'userId': '66', // 用户id
    //   'name': 'becks', // 	昵称
    //   'phone': '15921845363', // 手机号码
    //   'province': '上海', // 	省份编码
    //   'provinceCode': 310000, // 	省份编码
    //   'city': '上海市', // 城市
    //   'cityCode': 310106, // 城市编码
    //   'district': '静安区', // 区域
    //   'districtCode': 510422, // 区域编码
    //   'address': '龙盛家园01107', // 详细地址
    //   'isDefault': '0' // 是否默认地址 0否 1是
    // };
    parms = {
      'content': '赔我的AJ，鞋子都烂掉了，脚趾头都露粗来了！！！！', // 用户id
      'userId': '15921845363'
    };

    wx.request({
      // url: 'http://192.168.1.125:8080/api/htt/app/user/insertAddress',
      url: 'http://192.168.1.125:8080/api/htt/app/user/insertSuggestion',
      data: parms,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("成功的数据：" + JSON.stringify(res))
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})