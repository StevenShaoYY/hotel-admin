/**
 * Created by stevenshao on 17/9/9.
 */
export default class App {
  constructor({ applicationId,
                appName,
                appType,
                versionName,
                updateTips,
                updateTime }) {
    this.applicationId = applicationId
    this.appName = appName
    this.appType = appType
    this.versionName = versionName
    this.updateTips = updateTips
    this.updateTime = updateTime
  }
}
