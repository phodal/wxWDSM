var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    systemInfo: {},
    _api: {},
    navbar: ['最新', '最火', '最热'],
    currentNavbar: '0',
    swipers: [],
    list: [],
    hot_last_id: 0,
    latest_list: [],
    latest_last_id: 0
  },

  onLoad() {
    var that = this;
    app.getSystemInfo(function (res) {
      that.setData({
        systemInfo: res
      })
    });

    that.setData({
      _api: api
    });

    this.onPullDownRefresh();
  },

  onItemClick(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/play-detail/play-detail?rowId=' + e.currentTarget.dataset.rowId
    })
  },

  gotoSearchPage(e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  switchNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '来，一起玩点什么',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    api.get(api.HOST + api.HOME)
      .then(res => {
        this.setData({
          data: res.data
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
  }
});
