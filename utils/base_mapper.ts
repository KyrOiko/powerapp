export interface BaseMapper<T, R> {
  map(entity: T): R;
}
