export interface DeviceInfo {
  ua: string;
  browser: BrowserInfo;
  engine: EngineInfo;
  os: OSInfo;
  device: any;
  cpu: any;
}

export interface BrowserInfo {
  name: string;
  version: string; 
  major: number;
}

export interface EngineInfo {
 name: string;
 version: string;
}

export interface OSInfo {
  name: string;
  version: string;
}
