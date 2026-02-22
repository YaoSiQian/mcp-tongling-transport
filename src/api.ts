const BASE_URL = "https://wx.tlgjzgs.com/Interact/TouchScreen";

async function fetchApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export interface LineInfo {
  LineId: string;
  AliasName: string;
  Direction: number;
  MainFirstTime: string;
  MainLastTime: string;
  SubFirstTime: string;
  SubLastTime: string;
  StartPoint: string;
  EndPoint: string;
}

export interface LineStationInfo {
  LineId: string;
  StationId: string;
  Direction: number;
  SequeNum: number;
  StationName: string;
}

export interface LineInfoWithStations extends LineInfo {
  lineStationInfos: LineStationInfo[];
  Name: string;
  IsSchedule: number;
  UpLength: number;
  DownLength: number;
}

export interface VehicleGpsInfo {
  LineId: string;
  VehicleLicence: string;
  CurrentStationId: string;
  CurrentStationVehicleCount: number;
  IsOperate: boolean;
}

export interface LineStationInfoTemp {
  LineId: string;
  StationId: string;
  Direction: number;
  StationName: string;
}

export interface LineGpsData {
  lineGpsListTemp: VehicleGpsInfo[];
  lineStationInfoTemp: LineStationInfoTemp[];
}

export interface LinePlanInfo {
  SendTime: string;
}

export interface TransferStation {
  BeginStation: string;
  LineName: string;
  EndStation: string;
}

export interface TransferInfo {
  StationCount: number;
  TransferStations: TransferStation[];
}

export async function getStationNameAutocomplete(stationName: string): Promise<string[]> {
  return fetchApi<string[]>("/GetStationName", { stationName });
}

export async function getNotice(): Promise<string> {
  return fetchApi<string>("/getNotice");
}

export async function getLineInfoByLineName(lineName: string): Promise<LineInfo[]> {
  return fetchApi<LineInfo[]>("/GetLineInfoByLine", { lineName });
}

export async function getLineInfosByStation(stationName: string): Promise<LineInfoWithStations[]> {
  return fetchApi<LineInfoWithStations[]>("/GetLineInfosByStation", { stationName });
}

export async function getLineStationGpsData(lineid: string, direction: number): Promise<LineGpsData> {
  return fetchApi<LineGpsData>("/GetLineStationGpsData", { lineid: String(lineid), direction: String(direction) });
}

export async function getLinePlanInfos(lineid: string, direction: number): Promise<LinePlanInfo> {
  return fetchApi<LinePlanInfo>("/GetLinePlanInfos", { lineid: String(lineid), direction: String(direction) });
}

export async function getTransferInfo(startStationName: string, endStationName: string): Promise<TransferInfo[]> {
  return fetchApi<TransferInfo[]>("/GetTransferInfo", { startStationName, endStationName });
}
