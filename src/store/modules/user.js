
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
// 状态
const state = {
  token: getToken(),
  userInfo: {}
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const result = await login(data)

    context.commit('setToken', result)
    setTimeStamp()
  },
  // 获取用户资料action
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值
    const baseinfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseinfo }) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回 为后面埋下伏笔
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('reomveUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
