declare const process: any;

export function isProd(): boolean {
  return process.env.NODE_ENV === 'prod';
}


export function isDev(): boolean {
  return !isProd();
}
