export default {
    login(state, v) {
        state.userInfo = v
    },
    setMemberInfo (state, v) {
        debugger
        state.userStatus = v.userStatus;
        state.vipLevel = v.vipLevel;
    },
    changeTestD (state) {
        debugger
        state.testD++;
    }
}