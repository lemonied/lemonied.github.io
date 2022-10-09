import moment from 'moment';

export function moment8(...args: Parameters<typeof moment>) {
  return moment(...args).utcOffset(8);
}
