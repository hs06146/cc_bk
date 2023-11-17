import { User } from "../models/user.model.js";
import { TokenService } from "./services/token.service.js";
import { CheerioService } from "./services/cheerio.service.js";
import { EmailService } from "./services/email.service.js";
export class UserController {
  getUsersData = async (req, res) => {
    const userData = await User.find({});
    res.send(userData);
  };

  postUserData = async (req, res) => {
    const { name, email, personal, prefer, pwd, phone } = req.body;
    const tokenService = new TokenService(phone);
    const cheerioService = new CheerioService(prefer);
    const emailService = new EmailService(email, name);
    const isAuth = tokenService.checkPhoneIsAuthenticated();
    if (isAuth === false) {
      res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.");
      return;
    }

    const ogData = cheerioService.getOG();
    const pattern = /.{6}$/;

    const userData = new User({
      name,
      email,
      personal: personal.replace(pattern, "******"),
      prefer,
      pwd,
      phone,
      og: {
        title: ogData.title,
        description: ogData.description,
        image: ogData.image,
      },
    });

    const isValid = emailService.checkValidationEmail();
    if (isValid) {
      const mytemplate = emailService.getWelcomeTemplate();
      emailService.sendTemplateToEmail();
    }
    await userData.save();
    res.send(userData._id);
  };
}
