import JWT from "jsonwebtoken";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };
  const token = JWT.sign(
    payload,
    "lasjf lakasj flsj lsaj lsadj lksdj flksaj lsj lksdajflksdjf lksd lsdj lksdjf lksdf lksd"
  );
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}
export { createTokenForUser, validateToken };
