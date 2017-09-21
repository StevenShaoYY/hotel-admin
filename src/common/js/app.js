/**
 * Created by stevenshao on 17/9/9.
 */
export default class App {
  constructor({ id,
                appName,
                appType,
                versionName,
                updateTips,
                updateTime }) {
    this.id = id
    this.appName = appName
    this.appType = appType
    this.versionName = versionName
    this.updateTips = updateTips
    this.updateTime = updateTime
  }
}
