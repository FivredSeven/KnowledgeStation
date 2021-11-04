// pages/kmain/main.js
var curMaxKId = 0
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
     recList:[{
    //   k_id:1,
    //   title:'什么是元宇宙'
    //  },{
    //   k_id:2,
    //   title:'喝咖啡为什么能提神'
     }],
     len:1,
  },

  tapItem(res) {
    let item = res.currentTarget.dataset.item;
    console.log('tapItem:' + item.title)
    wx.navigateTo({
      url: `/pages/kdetail/detail?k_id=${item.k_id}&title=${item.title}`,
    })
  },

  queryAndAdd() {
    var that = this;
    const db = wx.cloud.database()
    db.collection('k_data')
    .where({
      _openid: 'o6Hkn5bL0hl1FfKRQMQOjvm7xlG8'
    })
    .orderBy('k_id','desc')
    .get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        console.log('len:' + res.data.length)
        curMaxKId = res.data[0].k_id
        console.log('queryAndAdd k_id：' + curMaxKId)
        curMaxKId = curMaxKId+1;
        console.log('queryAndAdd curMaxKId' + curMaxKId)
        that.addDataToDb()

      }
    })
  },

  addDataToDb() {
    const db = wx.cloud.database()
    console.log('addDataToDb curMaxKId' + curMaxKId)
    db.collection('k_data').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        k_id: curMaxKId,
        title: '电动车电池种类和区别',
        author: '',
        addtime: Date.now(),
        type: 1,
        visitor: 0,
        star: 0,
        comment: 0,
        collect: 0
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      env: 'cloud1-4ga13puefd14b1b5'
    })

    var that = this;
    const db = wx.cloud.database()
    db.collection('k_data')
    .where({
      _openid: 'o6Hkn5bL0hl1FfKRQMQOjvm7xlG8'
    })
    .orderBy('k_id','desc')
    .get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        console.log('len:' + res.data.length)
        that.setData({
          recList: res.data,
          len: res.data.length
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})