// pages/myaddress/myaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
    //   {
    //     name: '酷酷娣',
    //     phone: '15921845363',
    //     isDefault: '1',

    //   }
    ]
  },
  onShow(){
    var self = this;
    // parms.userId = '15921845363'
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/user/getAddress?userId=66',
      // data: parms,
      // method: methods,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("成功的数据：" + JSON.stringify(res))
        self.setData({
          addressList: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getaddress(e){
    console.log(e.currentTarget.dataset.url);
    var url = e.currentTarget.dataset.url;
    var parms = {};
    var methods = 'GET';
    var headers = {
      'content-type': 'application/json'
    }
    if (url === 'insertAddress'){
      console.log('新增用户地址');
      methods = 'POST';
      headers = {
        'content-type': 'application/x-www-form-urlencoded'
      };
      parms = {
        'userId': '66', // 用户id
        'name': 'becks', // 	昵称
        'phone': '15921845363', // 手机号码
        'province': '四川省', // 	省份编码
        'provinceCode': 510000, // 	省份编码
        'city': '攀枝花市', // 城市
        'cityCode': 510400, // 城市编码
        'district': '盐边县', // 区域
        'districtCode': 510422, // 区域编码
        'address': '大头村222号', // 详细地址
        'isDefault': '1' // 是否默认地址 0否 1是
      };
    } else if (url === 'updateAddress'){
      console.log('修改用户地址')
      methods = 'PUT';
      parms = {
        'id': '', // 主键
        'userId': '66', // 用户id
        'name': 'becks', // 	昵称
        'phone': '15921845363', // 手机号码
        'province': '四川省', // 	省份编码
        'provinceCode': 510000, // 	省份编码
        'city': '攀枝花市', // 城市
        'cityCode': 510400, // 城市编码
        'district': '盐边县', // 区域
        'districtCode': 510422, // 区域编码
        'address': '大头村228号', // 详细地址
        'isDefault': '1' // 是否默认地址 0否 1是
      }
    } else if (url === 'delAddress') {
      console.log('删除用户地址');
      methods = 'DELETE';
      parms.id = '' // 主键
    } else if (url === 'getAddress') {
      console.log('获取用户地址')
      parms.userId = '66' // 
    }
    console.log(parms)
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/user/' + url,
      data: parms,
      method: methods,
      header: headers,
      success: function (res) {
        console.log("成功的数据：" + JSON.stringify(res))
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  goAddress(e){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  goCompile(e){
    wx.navigateTo({
      url: '../compileaddress/compileaddress',
    })
  }
})