/**
 * Created by stevenshao on 17/9/11.
 */
export default class AdminManager {
  constructor({ id,
                username,
                name,
                role,
                module,
                status,
                remark,
                modifyPerson,
                updateTime }) {
    this.id = id
    this.username = username
    this.name = name
    this.role = role
    this.module = module
    this.status = status
    this.remark = remark
    this.modifyPerson = modifyPerson
    this.updateTime = updateTime
  }
}
