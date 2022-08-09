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
  _id: number,
  name: string,
  imagePath: string,
  price: number
}