<template>
    <div class="index">
        <h1>你好{{$route.params.id}}</h1>
        <p class="text">
            尊敬的
            <!-- <span style="color: red;">{{this.$store.getters.userStatus}}用户</span>，欢迎来到德莱联盟！ -->
            <span style="color: red;">{{memberInfo}}用户</span>，欢迎来到德莱联盟！
        </p>
{{test}}
        <div class>
            <card
                :course="item"
                @goVideoList="goVideoList"
                v-for="(item, index) in courseList"
                :key="index"
            ></card>
        </div>
        <button class="footer-opt btn" @click="recharge">充值</button>
        <button class="footer-opt btn" @click="listenT">listen</button>
    </div>
</template>

<script>
import store from "../store";
import card from "../components/card";
import {mapGetters, mapState} from 'vuex';
// import { mapGetters, mapState } from "vuex";
export default {
    components: {
        card
    },
    data() {
        return {
            courseList: []
        };
    },

    created() {
        // Mock
        this.courseList = [
            {
                id: "1",
                thumb:
                    "//img1.mukewang.com/5cb831fd0949d9f306000338-590-330.jpg",
                title: "学习vuex",
                description: "2312",
                charge: "",
                userStatus: 0,
                vipLevel: 0
            },
            {
                id: "2",
                thumb:
                    "//img1.mukewang.com/5cb831fd0949d9f306000338-590-330.jpg",
                title: "实战课程",
                description: "2312",
                charge: "实战课程",
                userStatus: 1,
                vipLevel: 0
            },
            {
                id: "3",
                thumb:
                    "//img1.mukewang.com/5cb831fd0949d9f306000338-590-330.jpg",
                title: "v12会员专享课程",
                description: "2312",
                charge: "v12会员专享",
                userStatus: 2,
                vipLevel: 12
            }
        ];
    },
    // vuex提供了mapGetters、mapActions(暂未用到)、mapState和mapMutations(暂未用到)来方便操作
    computed: {
        ...mapGetters(['memberInfo','test']),
        ...mapState(['userStatus', 'vipLevel', 'userInfo'])
    },
    watch:{
        test(val, oldval){
            debugger
        }
    },
    mounted() {
        debugger
        console.log('mapstate', this.userStatus, this.vipLevel, this.userInfo)
        console.log('test', store.getters.test)
    },
    methods: {
        listenT() {
            store.commit('changeTestD')
        },
        recharge() {
            this.$router.push("./userCenter");
        },
        goVideoList(e) {
            const res = this.checkPermission(e);
            if (res) {
                this.$router.push({
                    name: "course",
                    params: {
                        id: e.id
                    }
                });
            } else {
                alert("权限不足，无法观看");
            }
        },
        checkPermission(e) {
            debugger
            const userStatus = store.state.userStatus;
            const vipLevel = store.state.vipLevel;
            if (userStatus >= e.userStatus && vipLevel >= e.vipLevel) {
                return true;
            }
            return false
        },
        checkPermission1(e) {
            const userStatus = this.$store.state.userStatus;
            const vipLevel = this.$store.state.vipLevel;
            if (userStatus >= e.userStatus) {
                if (vipLevel >= e.vipLevel) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
};
</script>

<style lang="less">
.index {
    padding: 0 20px 20px;
    box-sizing: border-box;
    h1,
    .text {
        text-align: left;
    }
    .footer {
        position: absolute;
        bottom: 0;
        left: 20px;
    }
    .btn {
        width: 100%;
        height: auto;
        color: #fff;
        background: #373737;
        margin: 10px 0 20px;
        padding: 15px;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 16px;
    }
}
</style>

