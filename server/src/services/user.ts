import { UserModel } from "../models";
import { User } from "../interfaces";
import { hashPassword, sendMail, redis, jwt } from "../utils";
import { customAlphabet } from "nanoid";

class UserService {
  private userModel = new UserModel();

  async checkEmail(email: string) {
    const user = await this.userModel.findByEmail(email, { _id: 1 });
    if (user) throw new Error("409");
    const authNumber = customAlphabet("0123456789TripMatch", 6)();
    await redis.set(email, authNumber);
    await sendMail(
      email,
      "https://res.cloudinary.com/dnow6qfd8/image/upload/v1672316793/002_h5mfnj.png",
      `다음 인증번호를 입력해주십시오. >> ${authNumber}`
    );
  }
  async checkNumber(email: string, authNumber: string) {
    const correct = await redis.get(email);
    if (authNumber !== correct) throw new Error("400");
    await redis.set(email, "certified");
  }
  async join(body: User) {
    const result = await redis.get(body.email);
    if (result !== "certified") throw new Error("403");
    body.password = await hashPassword.hash(body.password);
    const user = await this.userModel.create(body);
    await sendMail(
      user.email,
      "https://res.cloudinary.com/dnow6qfd8/image/upload/v1672316793/001_e3imfo.png",
      "Trip Match에 가입되었습니다."
    );
  }
  async login(email: string, password: string) {
    const user = await this.userModel.findByEmail(email, {
      _id: 0,
      email: 1,
      password: 1,
      role: 1,
    });
    if (!user) throw new Error("400");
    const result = await hashPassword.compare(password, user.password);
    if (!result) throw new Error("400");
    const accessToken = await jwt.create(
      { email: user.email, role: user.role },
      "1h"
    );
    const refresh = await jwt.create({}, "7d");
    await redis.set(user.email, refresh);
    return {
      "x-access-token": accessToken,
      refresh,
      email: user.email,
      role: user.role,
    };
  }
  async getAuthor(email: string) {
    const user = await this.userModel.findByEmail(email, {
      _id: 0,
      email: 1,
      nickname: 1,
      profileImg: 1,
    });
    return {
      email: user?.email,
      nickname: user?.nickname,
      profileImg: user?.profileImg,
    };
  }
  async getUser(email: string) {
    const user = await this.userModel.findByEmail(email, {
      _id: 0,
      nickname: 1,
      gender: 1,
      age: 1,
      introduce: 1,
      profileImg: 1,
      matchPoints: 1,
    });
    if (!user) throw new Error("204");
    const { nickname, gender, age, introduce, profileImg, matchPoints } = user;
    const matchCount = matchPoints.length;
    const matchPoint = matchCount
      ? (matchPoints.reduce((acc, val) => acc + val, 0) / matchCount).toFixed(1)
      : "0";
    return {
      email,
      nickname,
      gender,
      age,
      introduce,
      profileImg,
      matchCount,
      matchPoint,
    };
  }
  async delete(email: string) {
    await this.userModel.deleteOne(email);
  }
  async update(email: string, body: object) {
    if ("password" in body)
      body.password = await hashPassword.hash(body.password as string);
    await this.userModel.updateOne(email, body);
  }
  async refresh(accessToken: string, refresh: string) {
    await jwt.verify(refresh);
    const decoded = jwt.decode(accessToken);
    const correct = await redis.get(decoded.email);
    if (refresh !== correct) throw new Error("401");
    const newToken = await jwt.create(
      { email: decoded.email, role: decoded.role },
      "1h"
    );
    return { "x-access-token": newToken };
  }
  async getUserList(keyword: string) {
    const condition: { $or?: [{}, {}] } = {};
    if (keyword) {
      const regex = new RegExp(`(${[...keyword].join(".*")})`);
      condition.$or = [{ email: regex }, { nickname: regex }];
    }
    const users = await this.userModel.findForAdmin(condition);
    if (users.length === 0) throw new Error("204");
    return users;
  }
  async newPassword(email: string) {
    const user = await this.userModel.findByEmail(email, { _id: 1 });
    if (!user) throw new Error("400");
    const password = customAlphabet("0123456789TripMatch", 8)();
    const hashed = await hashPassword.hash(password);
    await this.userModel.updateOne(email, { password: hashed });
    await sendMail(
      email,
      "https://res.cloudinary.com/dnow6qfd8/image/upload/v1672316792/003_lytao5.png",
      `임시 비밀번호입니다. 로그인 후 꼭 비밀번호를 변경해주십시오. >> ${password}`
    );
  }
}

const userService = new UserService();

export default userService;
