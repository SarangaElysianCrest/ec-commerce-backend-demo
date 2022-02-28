import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

  public async findByEmail(email: string) {
    console.log(email)
    return this.findOne({ email: email })
  }

}