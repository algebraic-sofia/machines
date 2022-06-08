type JSet<T> = {
  wrap: Map<number, T>
  [Symbol.iterator](): IterableIterator<T>
  toString(): string
}

// Bad hashing algorithm because I Have no idea on how to make it better
const hashify = (s: any): number => {
  let hash = 0
  switch (typeof s) {
    case 'string': {
      if (s.length === 0) return hash
      for (let i = 0; i < s.length; i++) {
        let chr = s.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
      }
      return hash
    }
    case 'number': {
      return hashify((s << 4).toString())
    }
    default: {
      if (s instanceof Map) {
        for (let [k, v] of s) {
          hash ^= hashify(k) | hashify(v)
        }
      } else if (Array.isArray(s)) {
        hash = s.reduce((p, c) => p ^ hashify(c), hash)
      } else if (s?.wrap) {
        return hashify(s.wrap)
      } else if (s instanceof Object) {
        return hashify(Object.entries(s))
      } else {
        throw new Error('Cannot process' + JSON.stringify(s))
      }
    }
  }
  return hash
}

const insert = <T>(map: JSet<T>, name: T) => map.wrap.set(hashify(name), name)
const has = <T>(map: JSet<T>, name: T) => map.wrap.has(hashify(name))

const mkJSet = <T>(elems: [number, T][] = []): JSet<T> => {
  let wrap = new Map(elems)
  return {
    wrap,
    *[Symbol.iterator]() {
      for (let [_, elem] of wrap) {
        yield elem
      }
    },
    toString() {
      return [...wrap.keys()].toString()
    },
  }
}

const cloneJSet = <T>(x: JSet<T>): JSet<T> => mkJSet([...x.wrap])

const toArr = <T>(set: JSet<T>): T[] => [...set.wrap].map(([_, t]) => t)

export type { JSet }
export { insert, has, mkJSet, cloneJSet, toArr, hashify }
