const passport = require("passport");
const tokenObject = require("../auth/tokens");
const User = require("../models").User;

module.exports = {
  local: (req, res, next) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error) {
        return res.status(401).json(error);
      }
      req.user = user;
      return next();
    })(req, res, next);
  },
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const id = await tokenObject.refresh.search(refreshToken);

      if (!id) {
        return res.status(401).json({ message: "Refresh token expired" });
      }

      await tokenObject.refresh.delete(refreshToken);
      const user = await User.findOne({
        where: { id },
      }).exec();

      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  bearer: (req, res, next) => {
    passport.authenticate("bearer", { session: false }, (error, user, info) => {
      if (error) {
        return res.status(401).json(error);
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next();
    })(req, res, next);
  },
};
