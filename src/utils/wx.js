//腾讯地图私人密钥
const QQ_MAP_KEY = '5EMBZ-EPBLI-I6WGR-5YKKC-5V5H6-45BIN';

export function wx_hideLoading() {
    wx.hideLoading();
}

export function wx_showLoading(title = '定位中') {
    wx.showLoading({
        title,
        mask: true
    })
}

export function wx_showToast(title = "") {
    wx.showToast({
        title: title || "检测到您未授权使用位置权限，请先开启哦",
        icon: 'none',
        duration: 3000
    })
}

/**
 * 微信自动定位
 */
export function wx_getLocation(callback) {
    wx.getLocation({
        type: "gcj02",
        success: res => {
            const { latitude, longitude } = res;
            getRealLocation(latitude, longitude, data => {
                if (callback) {
                    callback({ data, lat: latitude, lng: longitude });
                }
            });
            // wx_hideLoading();
        },
        fail: function (e) {
            wx_showToast('定位失败');
        }
    });
}

/**
 * 用户手动定位
 */
export function wx_chooseLocation(callback) {
    wx.chooseLocation({
        success: function (data) {
            if (callback) {
                callback(data)
            }
        },
        fail: function () {
            console.log('用户取消更换定位操作')
            // wx_showToast("定位失败");
        }
    });
}

/**
 * 调用腾讯地图，获取用户实时位置
 * @param {number} lat 通过wx.getLocation获取的经度
 * @param {number} lng 通过wx.getLocation获取的纬度
 */
export function getRealLocation(lat, lng, callback) {
    wx_showLoading('定位中')
    return new Promise((resolve, reject) => {
        wx.request({
            url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${QQ_MAP_KEY}&get_poi=1`,
            success: function ({ data, statusCode }) {
                if (statusCode === 200) {
                    wx_hideLoading();
                    if (callback) {
                        callback(data.result);
                        resolve();
                    } else {
                        resolve(data.result);
                    }
                } else {
                    showToast('定位失败,请重试');
                    reject();
                }
            },
            fail: function (e) {
                showToast('网络异常');
                reject();
            }
        })
    })
}