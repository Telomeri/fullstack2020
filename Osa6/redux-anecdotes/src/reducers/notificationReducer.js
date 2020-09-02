const notificationReducer = (state = 'REMOVE_MESSAGE', action) => {
    switch (action.type) {
      case 'SET_MESSAGE':
        return {message: action.message, time : action.time}
      case 'REMOVE_MESSAGE':
        return false
      default:
        return false
    }
  }
  
  export const notificationDisplay = (message, time) => {
    return async dispatch => {
      dispatch ({
      type: 'SET_MESSAGE',
      message, 
      time
    })
    }
  }
  
  export const notificationRemove = () => {
    return async dispatch => {
      dispatch ({
      type: 'REMOVE_MESSAGE'
    })
    }
  }

  
  export default notificationReducer
  