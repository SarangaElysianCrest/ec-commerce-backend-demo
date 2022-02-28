import { CreateUserDto, DeleteUserDto, QueryUsersDto, UpdateUserDto, UserResponseDto } from "../dto/user.dto";
import context from "../lib/context";

export async function createUser(createUserDto: CreateUserDto) {
  try {
    const user = await context.db.userRepository.save({
      ...createUserDto
    });
    return <UserResponseDto>{
      ...user
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("user could not be created!");
  }
}

export async function updateUser(updateUserDto: UpdateUserDto) {
  try {
    const { id, ...updateObj } = updateUserDto;
    const user = await context.db.userRepository.findOne(id);
    if (!user) {
      throw new Error("user not found!");
    }
    Object.keys(updateObj).forEach(k => {
      (user as any)[k] = (updateObj as any)[k];
    });
    const updatedUser = await context.db.userRepository.save(user);
    return <UserResponseDto>{
      ...updatedUser
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("user could not be updated!");
  }
}

export async function deleteUser(deleteUserDto: DeleteUserDto) {
  try {
    const deleteResult = await context.db.userRepository.delete(deleteUserDto.id);
    if (deleteResult.affected == 1) {
      return;
    }
    throw new Error("user not found!");
  } catch (e) {
    context.logger.warn(e);
    throw new Error("user could not be deleted!");
  }
}

export async function queryUsers(queryUsersDto: QueryUsersDto) {
  try {
    console.log(queryUsersDto);
    const usersQuery = context.db.userRepository.createQueryBuilder('users')
    
    if(queryUsersDto.email){
      usersQuery.where('email = :email', {email: queryUsersDto.email})
    }

    console.log(usersQuery.getSql())

    const users = await usersQuery.getMany();

    return users.map(u => {
      return <UserResponseDto>{
        ...u
      };
    });
  } catch (e) {
    context.logger.warn(e);
    throw new Error("could not query users!");
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await context.db.userRepository.findOne(userId);
    if (!user) {
      throw new Error("user not found!");
    }
    return <UserResponseDto>{
      ...user
    };
  } catch (e) {
    context.logger.warn(e);
    throw new Error("user not found!");
  }
}