import { wx_showToast, wx_showLoading, wx_hideLoading } from './wx';
const IMAGE_PATH = '/static/weathercn02/';

//极速Api
let API_KEY = 'ac8eda7e34013a98';
let API = `https://api.jisuapi.com/weather/query`;

//获取常规天气数据
export function getWeather(lat, lng) {
    wx_showLoading('加载天气中')
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${API}?appkey=${API_KEY}&location=${lat},${lng}`,
            success: function ({ data, statusCode }) {
                wx_hideLoading();
                if (statusCode === 200 && data.status === '0') {
                    resolve(data.result);
                } else {
                    wx_showToast('出现了点小问题,请稍后重试');
                    reject();
                }
            },
            fail: function () {
                wx_hideLoading();
                wx_showToast('出现了点小问题,请稍后重试');
                reject();
            }
        })
    })
}

//g根据code获取相应的天气图标类名
export function getIcon(code) {
    if (typeof code !== 'number' && typeof code !== 'string') {
        console.warn('code should be a number or string');
        return null;
    }
    return `${IMAGE_PATH}${parseInt(code)}.png`;
}