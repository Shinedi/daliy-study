export default {
    memberInfo (state) {
        switch (state.userStatus) {
            case 0:
                return '普通会员'
            case 1:
                return 'vip会员'
            case 2:
                return `高级v${state.vipLevel}会员`
            default: 
                return '普通会员'
        }
    },
    // 
    test(state, getters) {
        debugger
        return getters.memberInfo
    }
}