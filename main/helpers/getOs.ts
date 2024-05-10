import { system } from 'systeminformation'

export default async () => {
  const sys = await system();
  if (sys.manufacturer == 'Apple Inc.') return 'MacOS';
  return 'Windows';
}