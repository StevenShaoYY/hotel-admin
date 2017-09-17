/**
 * Created by stevenshao on 17/9/9.
 */
import fetch from 'common/js/fetch';

export function firmwareSearch(queryKey, type) {
  return fetch({
    url: `/ops/admin/firmwares?queryKey=${queryKey}&type=${type}`,
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

export function firmwareUpload(type, file, oldVersion, newVersion, updateTips) {
  return fetch({
    url: '/ops/admin/firmwares',
    method: 'post',
    data: {
      type,
      file,
      oldVersion,
      newVersion,
      updateTips
    }
  });
}

export function updateFirmware(id, file,  oldVersion, newVersion, updateTips) {
  return fetch({
    url: `/ops/admin/firmwares/${id}`,
    method: 'patch',
    data: {
      file,
      oldVersion,
      newVersion,
      updateTips
    }
  });
}

export function deleteirmware(id) {
  return fetch({
    url: `/ops/admin/firmwares/${id}`,
    method: 'delete'
  });
}
