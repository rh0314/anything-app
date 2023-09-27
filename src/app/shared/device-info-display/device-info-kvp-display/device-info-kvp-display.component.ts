import { Component, Input } from '@angular/core';

@Component({
  selector: 'any-device-info-kvp-display',
  templateUrl: './device-info-kvp-display.component.html',
  styleUrls: ['./device-info-kvp-display.component.scss']
})
export class DeviceInfoKvpDisplayComponent {

  @Input() kvp: { key: string; value: string; }

  constructor() {
    
  }
}
