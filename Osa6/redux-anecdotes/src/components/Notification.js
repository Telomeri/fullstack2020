import React from 'react'
import { connect } from 'react-redux'
import { notificationRemove } from '../reducers/notificationReducer'

//using connect

//had to be defined here for obvious reasons
var timeoutID = false

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  //decided to move timeout here since that seemed like the smartest move
  if (props.notification !== false) {
    //doesnt cut the message short
    if (timeoutID !== false) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      props.notificationRemove()
      timeoutID = false
    }, props.notification.time*1000)
    return (
      <div style={style}>
        {props.notification.message}
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  notificationRemove,
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notification)
export default ConnectedNotification
