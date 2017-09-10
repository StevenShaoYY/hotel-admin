/**
 * Created by stevenshao on 17/9/10.
 */
export default class Message {
  constructor({ id,
                userRange,
                type,
                important,
                title,
                content,
                img,
                publisher,
                publishTime,
                effectiveTime,
                transmitState,
                sendUser,
                receiveUser,
                viewUser,
                readState }) {
    this.id = id
    this.userRange = userRange
    this.type = type
    this.important = important
    this.title = title
    this.content = content
    this.img = img
    this.publisher = publisher
    this.publishTime = publishTime
    this.effectiveTime = effectiveTime
    this.transmitState = transmitState
    this.sendUser = sendUser
    this.receiveUser = receiveUser
    this.viewUser = viewUser
    this.readState = readState
  }
}
