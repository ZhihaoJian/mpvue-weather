import { wx_showToast, wx_showLoading, wx_hideLoading } from './wx';
const IMAGE_PATH = '/static/weathercn02/';

//极速Api
let API_KEY = 'ac8eda7e34013a98';
let API = `https://api.jisuapi.com/weather/query`;
const STATUS_STOP = 'STOP';
const STATUS_RUNNING = 'RUNNING';

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


class Particle {
    constructor(ctx, width, height, opts = {}) {
        this.ctx = ctx;
        this.w = width;
        this.h = height;
        this._timer = null;
        this._options = opts
        this.status = STATUS_STOP
        this._init()
    }

    _init() {

    }

    _update() {
        
    }

    _draw() {

    }

    run() {
        if (this.status !== STATUS_RUNNING) {
            this.status = STATUS_RUNNING;
            this._timer = setInterval(() => {
                this._draw();
            }, 30)
        }
        return this;
    }

    stop() {
        this.status = STATUS_STOP;
        clearInterval(this._timer);
        return this;
    }

    clear() {
        this.stop();
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.draw();
        return this;
    }
}

//下雨效果
export class RainEffect extends Particle {
    _init() {
        let h = this.h
        let w = this.w
        // 数量，根据不同雨大小，数量可调
        let amount = this._options.amount || 100
        // 速度参数，调节下落速度
        let speedFactor = this._options.speedFactor || 0.03
        let speed = speedFactor * h
        let ps = (this.particles = [])
        for (let i = 0; i < amount; i++) {
            let p = {
                x: Math.random() * w,
                y: Math.random() * h,
                l: 2 * Math.random(),
                xs: -1,
                ys: 10 * Math.random() + speed,
                color: 'rgba(255, 255, 255, 0.1)'
            }
            ps.push(p)
        }
    }

    _draw() {
        let ps = this.particles
        let ctx = this.ctx
        // 清空画布
        ctx.clearRect(0, 0, this.w, this.h)
        // 遍历绘制雨滴
        for (let i = 0; i < ps.length; i++) {
            let s = ps[i]
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            // 画线绘制雨点效果
            ctx.lineTo(s.x + s.l * s.xs, s.y + s.l * s.ys)
            ctx.setStrokeStyle(s.color)
            ctx.stroke()
        }
        ctx.draw()
        return this._update()
    }

    _update(){
        let { w, h } = this // 获取画布大小
        for (let ps = this.particles, i = 0; i < ps.length; i++) {
            // 开始下一个周期的位置计算
            let s = ps[i]
            s.x += s.xs
            s.y += s.ys
            // 超出范围，重新回收，重复利用
            if (s.x > w || s.y > h) {
                s.x = Math.random() * w
                s.y = -10
            }
        }
    }
}