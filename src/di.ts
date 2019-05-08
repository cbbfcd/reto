import * as React from 'react'
import {contextSymbol} from './store'

export const injectMetadataKey = Symbol()

export function inject(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let injects: number[] = Reflect.getOwnMetadata(injectMetadataKey, target, propertyKey) || []
  injects.push(parameterIndex)
  Reflect.defineMetadata(injectMetadataKey, injects, target, propertyKey)
}

export function injectable<T extends {new(...args:any[]):{}}>(constructor: T) {
  Reflect.defineMetadata(contextSymbol, React.createContext(null), constructor)
}