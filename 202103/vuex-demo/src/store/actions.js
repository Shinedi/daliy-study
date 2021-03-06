function pro () {
    debugger
    return new Promise((resolve, reject) => {

        // 修改本地state
        setTimeout(() => {
           /*  store.commit('setMemberInfo', {
                userStatus: e.userStatus,
                vipLevel: e.vipLevel
            }) */
            resolve({
                userStatus: 2,
                vipLevel: 1
            })
        }, 2000);
    })
}
function haha() {
    let t = Promise.resolve(2+1).then(res => {
        return Promise.resolve(res+2)
    })
    return t
}

export default {
    async buyVip (store, e) {
        // store是个对象，里面包含state和commit
        store.commit('setMemberInfo', await pro())
        let t = await haha()
        debugger
        return Promise.resolve(2+1);
    },
    
    getFreeVip(store) {
        return new Promise((resolve, reject) => {

            // 修改本地state
            setTimeout(() => {
                if (store.state.userStatus == 0) {
                    store.commit('setMemberInfo', {
                        userStatus: 1,
                        vipLevel: 1
                    })
                    resolve('分享成功，升级')
                } else {
                    resolve('分享成功') 
                }
                
                
            }, 2000);
        })
    }
}



