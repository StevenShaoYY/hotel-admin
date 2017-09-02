/**
 * Created by stevenshao on 17/9/2.
 */
export default class User {
  constructor({ id,
                userName,
                name,
                certificateNumber,
                phoneNumber,
                type,
                hotelCode,
                hotelName,
                createTime }) {
    this.id = id;
    this.userName = userName;
    this.name = name;
    this.certificateNumber = certificateNumber;
    this.phoneNumber = phoneNumber;
    this.type = type;
    this.hotelCode = hotelCode;
    this.hotelName = hotelName;
    this.createTime = createTime;
  }
}
