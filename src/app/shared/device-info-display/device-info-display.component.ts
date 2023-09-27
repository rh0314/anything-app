import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Component({
  selector: 'any-device-info-display',
  templateUrl: './device-info-display.component.html',
  styleUrls: ['./device-info-display.component.scss']
})
export class DeviceInfoDisplayComponent {
  deviceType: any;

  constructor(private windowRef: WindowRefService, private dialogService: DialogService) {
    this.deviceType = this.windowRef.deviceInfo.device.type || this.windowRef.deviceInfo.os.name;

  }

  showDeviceInfo() {
    this.dialogService.openDeviceInfoDialog();
  }
}
