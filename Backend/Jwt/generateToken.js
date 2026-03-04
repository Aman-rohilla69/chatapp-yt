import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign(
    {
      userId,   //payload data, we can add more data here if needed in the future
    },
    process.env.JWT_TOKEN,    // Secret jwt token
    {
      expiresIn: "10d",  // token exipiry..
    },
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};
export default createTokenAndSaveCookie;
