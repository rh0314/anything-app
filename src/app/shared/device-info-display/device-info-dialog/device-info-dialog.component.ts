import { Component } from '@angular/core';
import { DeviceInfo } from 'src/app/models/device-info.model';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Component({
  selector: 'any-device-info-dialog',
  templateUrl: './device-info-dialog.component.html',
  styleUrls: ['./device-info-dialog.component.scss']
})
export class DeviceInfoDialogComponent {
  deviceInfo: DeviceInfo;
  keys: string[];

  constructor(private windowRef: WindowRefService) {
    this.deviceInfo = this.windowRef.deviceInfo;
    delete this.deviceInfo.ua;
    this.keys = Object.keys(this.deviceInfo);
  }

  getDeviceDetails(obj: any) {
    if (!obj) { return null; }
    if (typeof obj === 'string') {
      return [obj];
    }
    const keys = Object.keys(obj);
    if (!keys || !keys.length) { return null; }


    let details = [];
    keys.forEach(key => {
      if (key === 'ua') { return; }
      const detail = {
        key: key,
        value: obj[key]
      };
      details.push(detail);
    });
    return details;
  }

  hasDeviceDetail(key: string) {
    return this.deviceInfo && this.deviceInfo[key] && (Object.keys(this.deviceInfo[key]) || []).length;
  }
}
