/**
 * Created by stevenshao on 17/9/2.
 */
export default class Room {
  constructor({ id,
                roomNumber,
                floor,
                phoneNumber,
                bedCount,
                hotelCode }) {
    this.id = id
    this.roomNumber = roomNumber
    this.floor = floor
    this.phoneNumber = phoneNumber
    this.bedCount = bedCount
    this.hotelCode = hotelCode
  }
}
