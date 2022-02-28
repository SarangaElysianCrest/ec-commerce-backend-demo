export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  homePhone:string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province:string;
  postalCode:string
}

export interface UpdateUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  homePhone:string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province:string;
  postalCode:string
}

export interface DeleteUserDto {
  id: string;
}

export interface QueryUsersDto {
  id: string;
  email:string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  homePhone:string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province:string;
  postalCode:string
}
