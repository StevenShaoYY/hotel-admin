/**
 * Created by stevenshao on 17/9/9.
 */
export default class Firmware {
  constructor({ id,
                name,
                type,
                oldVersion,
                newVersion,
                updateTips,
                updateTime }) {
    this.id = id
    this.name = name
    this.type = type
    this.oldVersion = oldVersion
    this.newVersion = newVersion
    this.updateTips = updateTips
    this.updateTime = updateTime
  }
}
