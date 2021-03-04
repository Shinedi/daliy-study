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

export default {
    async buyVip (store, e) {
        debugger
        // store是个对象，里面包含state和commit
        store.commit('setMemberInfo', await pro())
        
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



