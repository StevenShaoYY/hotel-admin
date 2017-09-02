/**
 * Created by stevenshao on 17/9/2.
 */
export default class Hotel {
  constructor({ hotelCode,
                hotelName,
                hotelAddress,
                hotelManager,
                contactNumber,
                totalRooom,
                totalBed,
                belongArea,
                createPerson,
                createTime,
                modifyPerson,
                modifyTime }) {
    this.hotelCode = hotelCode
    this.hotelName = hotelName
    this.hotelAddress = hotelAddress
    this.hotelManager = hotelManager
    this.contactNumber = contactNumber
    this.totalRooom = totalRooom
    this.totalBed = totalBed
    this.belongArea = belongArea
    this.createPerson = createPerson
    this.createTime = createTime
    this.modifyPerson = modifyPerson
    this.modifyTime = modifyTime
  }
}
