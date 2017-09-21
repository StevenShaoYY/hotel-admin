/**
 * Created by shaojunyan on 2017-7-27.
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

export function dateFormat(dateObj) {
  let result = ''
  if (dateObj instanceof Date) {
    const year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    if (parseInt(month) < 10)
      month = '0' + month
    let day = dateObj.getDate()
    if (parseInt(day) < 10)
      day = '0' + day
    result = `${year}-${month}-${day}`
  }
  return result;
}
