/**
 * Created by stevenshao on 17/9/9.
 */
import fetch from 'common/js/fetch';

export function appSearch(queryKey, appType, size, offset) {
  return fetch({
    url: `/ops/admin/apps?queryKey=${queryKey}&appType=${appType}&size=${size}&offset=${offset}`,
    method: 'get'
  });
}

export function appUpdate(deviceList, condition, type, applicationId) {
  return fetch({
    url: '/ops/devices/application',
    method: 'post',
    data: {
      deviceList,
      condition,
      type,
      applicationId
    }
  });
}
