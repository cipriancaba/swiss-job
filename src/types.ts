export interface Product {
  product: string
  color: string
  price: string
}

export interface ProductMap {
  from: string
  to: string
}

export type ValidatedProduct<P> = {
  [K in keyof P]: {
    value: string
    isValid: boolean
    validationError?: string
  }
}
