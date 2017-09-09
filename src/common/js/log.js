/**
 * Created by stevenshao on 17/9/9.
 */
export default class Log {
  constructor({ id,
              fileName,
              filePath,
              updateTime }) {
    this.id = id
    this.fileName = fileName
    this.filePath = filePath
    this.updateTime = updateTime
  }
}
