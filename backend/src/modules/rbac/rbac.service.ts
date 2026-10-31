import { User } from "../auth/user.model.js";
import { Permission } from "./permission.model.js";
import { Role } from "./role.model.js";

export class RbacService {

  static async getUserPermissions(userId: number): Promise<User | null> {
    return User.findByPk(userId, {
      include: [{
        model: Role,
        as: "roles",
        through: { attributes: [] },
        include: [{
          model: Permission,
          as: "permissions",
          through: { attributes: [] }
        }]
      }]
    });
  }
}