import { combineReducers } from 'redux'
let path
function user(state = {}, actions) {
  switch (actions.type) {
    case 'loginSuccess':

      return { ...actions.data, redirect: '/' }
    case 'loginFail':
      // if (actions.data == 'Please login') path = '/login'
      return { msg: actions.data }
    case 'autoLoginFail':
      return {}
    case 'resetUpdate':

      return { ...state, afterUpdate: false }
    default:
      return state
  }

}

function msgList(state = {}, actions) {
  switch (actions.type) {
    case ('updateMsgList'):

      let totalUnread = actions.data.msgList.reduce((p, n) => p + (n.to == actions.data.userId && !n.read ? 1 : 0), 0)
      // actions.data.totalUnread = totalUnread
      // return actions.data
      return { ...actions.data, totalUnread }
    case ('updateMsg'):

      return { totalUnread: state.totalUnread + ((actions.data.data.to == actions.data.userId && !actions.data.read) ? 1 : 0), usersAvatar: state.usersAvatar, msgList: [...state.msgList, actions.data.data] }
    default:
      return state
  }
}

export default combineReducers({ user, msgList })