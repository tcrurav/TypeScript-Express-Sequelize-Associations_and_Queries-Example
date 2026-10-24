// import bcrypt from "bcryptjs";
// import { User } from "./user.model.js";

// export class AuthService {

//   static async validateCredentials(
//     username: string,
//     password: string
//   ): Promise<User | null> {

//     const user = await User.findOne({
//       where: { username }
//     });

//     if (!user) {
//       return null;
//     }

//     const validPassword = await bcrypt.compare(
//       password,
//       user.passwordHash
//     );

//     if (!validPassword) {
//       return null;
//     }

//     return user;
//   }
// }
