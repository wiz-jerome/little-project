Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    del: true,
    middlearr: [],
    singularPitchon: false, // 单条产品选中
    majorityPitchon: false, // 全选产品选中
    total: 0,
    cont: 0,
    totalbackgr: '#666666',
    selectList: [], // 选中的产品的唯一ID数组 

  },
  onLoad: function (e) {
    this.pageInit();
  },
  pageInit(e){
    var self = this;
    console.log('初始化');
    // 获取购物车列表
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/product/getShoppingCart',
      data: {
        userId: 66
      },
      success: function (res) {
        // var res = {
        //   "data": {
        //     "code": "200",
        //     "message": "成功",
        //     "data": [{
        //       "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/positive.png",
        //       "cost": 100,
        //       "uniqueCode": "cart_5458803818526492",
        //       "describe": "鞋腰鳄鱼皮纯蓝",
        //       "productName": "PLUM FOG"
        //     }, {
        //       "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/positive.png",
        //       "cost": 100,
        //       "uniqueCode": "cart_5464118278789915",
        //       "describe": "鞋头／斜眼片／护条人造皮纯黑鞋面和鞋舌人造皮纯红",
        //       "productName": "PLUM FOG"
        //     }, {
        //       "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/positive.png",
        //       "cost": 100,
        //       "uniqueCode": "cart_5464021455794990",
        //       "describe": "鞋腰鳄鱼皮纯蓝",
        //       "productName": "PLUM FOG"
        //     }]
        //   }
        // }
        console.log("获取购物车列表数据：" + JSON.stringify(res));
        // var res = JSON.parse(res)
        var data = [];
        if (res.data.code === '200') {
          data = res.data.data;
          console.log(data)
          console.log(data.length)
          var length = data.length;
          if(length > 0) {
            for (let i = 0; i < length; i++) {
              console.log(i)
              data[i].isTouchMove = false;
              data[i].checked = false;
            }
            self.setData({
              items: data,

            })
            console.log(self.data.items)
          } else if (length === 0) {
            self.setData({
              isTouchMove: false, //默认隐藏删除
              items: []
            })
          }
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  
  /**
   * 手指触摸动作开始 记录起点X坐标
   */
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove) {//只操作为true的

        //  v.isTouchMove = false;
      }
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  
  /**
   * 滑动事件处理
   */
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },

  /**  
   * 计算滑动角度  * 
   * @param {Object} start 起点坐标  * 
   * @param {Object} end 终点坐标  
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  
  /**
   * 删除事件
   */
  delClick: function (e) {
    var self = this;
    self.setData({
      del: false
    })
  },
  
  /**
   * 确认删除
   */
  confirmDel: function (e) {
    var self = this;
    var uniqueCode = e.currentTarget.dataset.code;
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/product/delShoppingCart?uniqueCode=' + uniqueCode,
      method: 'DELETE',
      success: function (res) {
        console.log("确认删除数据：" + JSON.stringify(res))
        // this.setData({
        //   items: res.data.data
        // })
        if (res.data.code === '200') {

          // this.data.items.splice(e.currentTarget.dataset.index, 1);
          self.setData({
            del: true
          })
          self.pageInit();
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })

    // 地步价格和个数
    if (this.data.majorityPitchon === true) {
      var arr = this.data.items
      var allprice = 0;
      for (var i=0; i<arr.length; i++) {
        arr[i].checked = true
        allprice += arr[i].cost
      }
      this.setData({
        total: allprice,
        middlearr: arr
      })
    }
  },


  /**
   * 单条产品选择
   */
  singularSelect(e) {
    // 购物车产品的列表
    var arr = this.data.items
    var selectList = this.data.selectList
    // 选中单个产品的ID
    var index = e.currentTarget.dataset.id
    // 选中产品的价格
    var cost = e.currentTarget.dataset.cost
    // 选中产品后点亮选择按钮
    arr[index].checked = !arr[index].checked
    //  * 将购物车中所有产品选中后，全选按钮点亮
    if(arr[index].checked){
      this.data.cont++;
      console.log(arr[index].uniqueCode)
      selectList.push(arr[index].uniqueCode)
      console.log(selectList)      
      if (this.data.cont === arr.length) {
        this.setData({
          majorityPitchon: true,
          cont: 0
        })
      }
      this.setData({
        selectList: selectList
      })
    }
    
    // * 计算选中的产品的个数，（middlearr.length为选中产品的个数）
    var arr2 = []
    var allprice = 0;
    for(var i=0; i<arr.length; i++) {
      if(arr[i].checked){
        arr2.push(arr[i]);
        allprice += arr[i].cost
      }
    }
    this.setData({
      items: arr,
      middlearr: arr2,
      total: allprice
    })

    if (arr2.length === 0){
      this.setData({
        totalbackgr: '#666',
      })
    }else{
      this.setData({
        totalbackgr: '#000',
      })
    }
  },

  /**
   * 全部产品选择
   */
  selectNo(e) {
    console.log('all')
    var selectList = this.data.selectList
    var arr = this.data.items
    var allprice = 0;
    for (var i=0; i<arr.length; i++) {
      selectList.push(arr[i].uniqueCode)
      arr[i].checked = true
      allprice += arr[i].cost
    }
    this.setData({
      items: arr,
      majorityPitchon: !this.data.majorityPitchon,
      total: allprice,
      middlearr: arr,
      totalbackgr: '#000',
      selectList: selectList
    })
  },
   
  /**
   * 取消全部产品选择
   */
  selectAll(e) {
    console.log('no')
    var arr = this.data.items
    for (var i=0; i<arr.length; i++) {
      arr[i].checked = false
    }
    this.setData({
      items: arr,
      majorityPitchon: !this.data.majorityPitchon,
      total: 0,
      middlearr: [],
      totalbackgr: '#666'
    })
  },
  /**
   * 去付款
   */
  goConfirmorder(e) {
    var selectlist = e.currentTarget.dataset.selectlist;
    var uniqueCodeList = '';
      selectlist.forEach(res => {
        console.log(res)
        uniqueCodeList += res + ','
      });
    // 去除末尾的，
    uniqueCodeList=(uniqueCodeList.substring(uniqueCodeList.length-1)==',')?uniqueCodeList.substring(0,uniqueCodeList.length-1):uniqueCodeList;
    console.log(uniqueCodeList)
    // return
    wx.navigateTo({
      url: '../confirmorder/confirmorder?uniqueCodeList=' + uniqueCodeList,
    })
  }

})