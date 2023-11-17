import { Token } from "../models/token.model.js";
import { TokenService } from "./services/token.service.js";

export class TokenController {
  postToken = async (req, res) => {
    const { phone } = req.body;
    const tokenService = new TokenService(phone);

    const isValid = tokenService.checkValidPhone();
    if (isValid === false) {
      res.send("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
      return;
    }
    //const token = tokenService.getToken();
    tokenService.sendTokenToSMS();

    const userData = await Token.findOne({ phone });
    if (userData.phone === null) {
      const user = new Token({
        token,
        phone,
        isAuth: false,
      });
      await user.save();
    } else {
      await Token.updateOne({ phone }, { $set: { token } });
    }

    res.send("핸드폰으로 인증문자가 전송되었습니다.");
  };

  patchToken = async (req, res) => {
    const { phone, token } = req.body;
    const findPhone = await Token.findOne({ phone }).exec();
    if (findPhone === null) {
      return res.send("false");
    }
    if (findPhone.token === token) {
      await Token.updateOne({ phone }, { isAuth: "true" });
    }
    res.send("true");
  };
}
