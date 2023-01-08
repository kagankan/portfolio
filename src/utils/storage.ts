/**
 * localStorageを型付きで利用する
 * @example
 * const sampleStorage = createStorage({
 *   'key-1': 'string',
 *   'key-2': 'number',
 * });
 * sampleStorage.set('sample-1', '1');
 * const value = sampleStorage.get('sample-1');
 */
export const createStorage = <T extends Readonly<Record<string, "string" | "number" | "boolean">>>(typeDef: T) => {
  type Key = {
    [K in keyof T]: K extends string ? K : never;
  }[keyof T];

  type ValueTypeOf<K extends Key> = T[K] extends "string"
    ? string
    : T[K] extends "number"
    ? number
    : T[K] extends "boolean"
    ? boolean
    : never;

  /** 指定したキーの値を取得 */
  const get = <K extends Key, V extends ValueTypeOf<K>>(key: K): V | null => {
    const stringValue = localStorage.getItem(key);
    if (stringValue === null) return null;
    if (typeDef[key] === "number") {
      return Number(stringValue) as V;
    } else if (typeDef[key] === "boolean") {
      return (stringValue === "true") as V;
    } else {
      return stringValue as V;
    }
  };

  /** 指定したキーに値を設定 */
  const set = <K extends Key, V extends ValueTypeOf<K>>(key: K, value: V) => {
    let stringValue: string;
    if (typeof value === "boolean") {
      stringValue = value.toString();
    } else if (typeof value === "number") {
      stringValue = value.toString();
    } else {
      stringValue = value;
    }
    localStorage.setItem(key, stringValue);
  };

  /** 指定したキーの値を削除 */
  const remove = (key: Key) => {
    localStorage.removeItem(key);
  };

  /** すべてのキーの値を削除（デバッグ用途） */
  const clear = () => {
    (Object.keys(typeDef) as Key[]).forEach((key) => {
      remove(key);
    });
  };

  return {
    get,
    set,
    remove,
    clear,
  } as const;
};
