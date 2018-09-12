const mutations = {
    //设置经纬度
    setGecoder(state, payload) {
        const { lat, lng } = payload;
        state.lat = lat;
        state.lng = lng;
    }
}

export default mutations;