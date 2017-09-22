/**
 * Created by stevenshao on 17/9/13.
 */
export default class Role {
  constructor({ id,
                name,
                modules,
                remark,
                modifyPerson,
                updateTime }) {
    this.id = id
    this.name = name
    this.modules = modules
    this.remark = remark
    this.modifyPerson = modifyPerson
    this.updateTime = updateTime
  }
}
