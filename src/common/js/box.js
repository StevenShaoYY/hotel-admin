/**
 * Created by stevenshao on 17/9/3.
 */
export default class box {
  constructor({ id,
                boxName,
                romVersion,
                clientVersion,
                serialNumber,
                hotelCode,
                hotelName,
                hotelAddress,
                hotelManager,
                contactNumber,
                boxStatus,
                anlvAppVersion,
                mdmVersion,
                romVersionCLa,
                mcuVersion,
                ip,
                mac,
                usb1,
                usb2,
                usb3,
                usb4,
                usb5,
                usb6,
                insideStorageUsed,
                insideStorageUnused,
                externalStorageUsed,
                externalStorageUnused,
                samCode,
                registrationTIme,
                startTime,
                reportTime }) {
    this.id = id
    this.boxName = boxName
    this.romVersion = romVersion
    this.clientVersion = clientVersion
    this.serialNumber = serialNumber
    this.hotelCode = hotelCode
    this.hotelName = hotelName
    this.hotelAddress = hotelAddress
    this.hotelManager = hotelManager
    this.contactNumber = contactNumber
    this.boxStatus = boxStatus
    this.anlvAppVersion = anlvAppVersion
    this.mdmVersion = mdmVersion
    this.romVersion = romVersionCLa
    this.mcuVersion = mcuVersion
    this.ip = ip
    this.mac = mac
    this.usb1 = usb1
    this.usb2 = usb2
    this.usb3 = usb3
    this.usb4 = usb4
    this.usb5 = usb5
    this.usb6 = usb6
    this.insideStorageUsed = insideStorageUsed
    this.insideStorageUnused = insideStorageUnused
    this.externalStorageUsed = externalStorageUsed
    this.externalStorageUnused = externalStorageUnused
    this.samCode = samCode
    this.registrationTIme = registrationTIme
    this.startTime = startTime
    this.reportTime = reportTime
  }
}
