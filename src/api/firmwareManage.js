/**
 * Created by stevenshao on 17/9/9.
 */
import fetch from 'common/js/fetch';

export function firmwareSearch(queryKey, type, size, offset) {
  return fetch({
    url: `/ops/admin/firmwares?queryKey=${queryKey}&type=${type}&size=${size}&offset=${offset}`,
    method: 'get'
  });
}

export function firmwareUpdate(deviceList, condition, type, firmwareId) {
  return fetch({
    url: '/ops/devices/firmware',
    method: 'post',
    data: {
      deviceList,
      condition,
      type,
      firmwareId
    }
  });
}
