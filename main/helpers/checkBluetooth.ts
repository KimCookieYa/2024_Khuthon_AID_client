import { bluetoothDevices } from "systeminformation";

export async function checkBluetooth() {
  const bt = await bluetoothDevices();
  return bt;
}