/**
 * Created by stevenshao on 17/9/13.
 */
export default class Role {
  constructor({ id,
                name,
                module,
                remark,
                modifyPerson,
                updateTime }) {
    this.id = id
    this.name = name
    this.module = module
    this.remark = remark
    this.modifyPerson = modifyPerson
    this.updateTime = updateTime
  }
}
