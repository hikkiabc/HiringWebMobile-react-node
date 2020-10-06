import request from '../request'
import io from 'socket.io-client';

const connectIO = (dispatch, userId) => {
  if (!io.socket) io.socket = io("ws://localhost:4000/");
  io.socket.on('fromServer', (data) => {
    console.log(data);

    if (data.chatId) {
      if (data.chatId.indexOf(userId) != -1) {
        // data.userId = userId
        dispatch({ type: 'updateMsg', data: { data, userId } })
      }
    }
  })

}

export const login = (user) => {
  if (!user.password || !user.username) return { type: 'loginFail', data: 'Enter Username and Password' }

  return async dispatch => {
    const data = await request('/users/login', user)
    if (data.data.username) {
      dispatch({ type: 'loginSuccess', data: data.data })
      getMsgList(dispatch, data.data._id)
    }
    else dispatch({ type: 'loginFail', data: data.data })
  }
}
export const register = (user) => {

  if (user.password != user.password1) {
    return { type: 'loginFail', data: 'password must be same' }
  }
  else if (!user.password || !user.username) return { type: 'loginFail', data: 'Enter Username and Password' }

  return async dispatch => {
    const data = await request('/users/register', user)

    if (data.data.username) {
      dispatch({ type: 'loginSuccess', data: data.data })
      getMsgList(dispatch, data.data._id)
    }
    else {
      dispatch({ type: 'loginFail', data: data.data })
    }

  }
}

export const updateUserInfo = (user) => {
  return async dispath => {
    const data = await request('/users/update', user)

    if (data.data.username) dispath({ type: 'loginSuccess', data: { ...data.data, afterUpdate: true } })
    else dispath({ type: 'loginFail', data: data.data })
  }
}

export const autoLogin = () => {
  return async dispatch => {
    const data = await request('/users/autologin')


    if (data.data.username) {
      dispatch({ type: 'loginSuccess', data: data.data })
      getMsgList(dispatch, data.data._id)
    }
    else dispatch({ type: 'autoLoginFail', data: data.data })

  }
}


export const resetUpdate = () => ({ type: 'resetUpdate' })

export const logout = () => ({ type: 'autoLoginFail' })

export const sendMsg = (msg) => {
  // console.log('send');

  return dispatch => {
    io.socket.emit('fromClient', msg)
  }
}
export const setMsgAsRead = (idList, userId) => {

  return async dispatch => {
    const data = await request('/chat/setMsgAsRead', { idList })
    const data1 = await request('/chat/getMsgList', {}, 'get')
    console.log(data1);

    data1.data.userId = userId
    dispatch({ type: 'updateMsgList', data: data1.data })


  }
}
export const getMsgListForMsgIndex = (userId) => {
  return async dispatch => {
    const data = await request('/chat/getMsgList', {}, 'get')
    data.data.userId = userId
    dispatch({ type: 'updateMsgList', data: data.data })
  }

}



const getMsgList = async (dispatch, userId) => {
  connectIO(dispatch, userId)
  const data = await request('/chat/getMsgList', {}, 'get')


  data.data.userId = userId

  dispatch({ type: 'updateMsgList', data: data.data })
}