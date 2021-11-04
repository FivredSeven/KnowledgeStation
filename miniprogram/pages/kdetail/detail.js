// pages/kdetail/detail.js
var kId
var contentArray = []
var title
var kData

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('k detail onLoad', options)
    console.log('k detail title：' + options.title)
    console.log('k detail k_id:' + options.k_id)
    kId = parseInt(options.k_id)
    this.setData({
      title: options.title
    })
    this.getKnowledgeDetail()
    this.getKnowledgeData()
  },

  /**
   * 获取内容详情 k_detail
   */
  getKnowledgeDetail() {
    wx.cloud.init({
      env: 'cloud1-4ga13puefd14b1b5'
    })
    console.log('getKnowledgeDetail kId:' + kId)
    var that = this;
    const db = wx.cloud.database()
    db.collection('k_detail')
    .where({
      _openid: 'o6Hkn5bL0hl1FfKRQMQOjvm7xlG8',
      k_id: kId
    })
    .get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        console.log('len:' + res.data.length)
        var content = res.data[0].content
        // console.log('content:' + content)
        var array = content.split('&&')
        console.log('array:' + array[0])
        that.setData({
          contentArray: array
        })
      }
    })
  },

  /**
   * 获取基础数据 k_data
   */
  getKnowledgeData() {
    var that = this;
    const db = wx.cloud.database()
    db.collection('k_data')
    .where({
      _openid: 'o6Hkn5bL0hl1FfKRQMQOjvm7xlG8',
      k_id: kId
    })
    .get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log("getKnowledgeData:" + res.data)
        that.setData({
          kData : res.data[0]
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