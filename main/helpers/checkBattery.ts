import { battery } from "systeminformation";

export async function checkBattery(): Promise<boolean> {
  const state = await battery();
  if (state.percent >= 80 && state.isCharging) {
    console.log(state.percent);
    console.log(state.isCharging);
    return false
  }
  return true;
}