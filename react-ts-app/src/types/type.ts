import { Dispatch, SetStateAction } from 'react'

export default interface IUser {
  id?: any | null,
  username: string,
  name: string,
  surname: string,
  phone: string
  email: string,
  password: string,
  roles?: Array<string>
}

export interface ICartItem {
  name: string,
  imagePath: string,
  price: number,
  count: number
}

export interface IProduct {
  id: number,
  imagePath: string,
  categoryId: number,
  title: string,
  price: number,
  description: string,
  availability: boolean
}

export interface ICategory {
  id?: any | null,
  name: string,
}

export interface IColor {
  id?: any | null,
  name: string,
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>