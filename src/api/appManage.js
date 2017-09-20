/**
 * Created by stevenshao on 17/9/9.
 */
import fetch from 'common/js/fetch';

export function appSearch(queryKey, appType) {
  return fetch({
    url: `/ops/admin/apps?queryKey=${queryKey}&appType=${appType}`,
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

// export function appUpload(appType, appFile, updateTips) {
//   return fetch({
//     url: '/ops/admin/apps',
//     method: 'post',
//     data: {
//       appType,
//       appFile,
//       updateTips
//     }
//   });
// }

export function appUpload(formdata) {
  return fetch({
    url: '/ops/admin/apps',
    method: 'post',
    data: formdata
  });
}

// export function updateApp(id, appFile, updateTips) {
//   return fetch({
//     url: `/ops/admin/apps/${id}`,
//     method: 'patch',
//     data: {
//       appFile,
//       updateTips
//     }
//   });
// }

export function updateApp(id, dataform) {
  return fetch({
    url: `/ops/admin/apps/${id}`,
    method: 'patch',
    data: dataform
  });
}

export function deleteApp(id) {
  return fetch({
    url: `/ops/admin/apps/${id}`,
    method: 'delete'
  });
}
