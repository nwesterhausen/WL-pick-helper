export interface QueryParam {
    key: string;
    value: string;
  }
  
  export function queryParamsToEncodedString(params: QueryParam[]): string {
    if (params.length === 0) return '';
    const plist: string[] = [];
    for (const p of params) {
      plist.push(`${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`);
    }
    return `?${plist.join('&')}`;
  }