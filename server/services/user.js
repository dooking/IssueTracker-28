const db = require('./db/user');
/*
 * 해당 아이디가 디비에 존재하는지 조회
 */
exports.findUser = async (userId) => {
  const user = await db.selectUser(userId);
  return user;
};

/*
 * User DB에 유저정보 저장
 */
exports.insertUser = async (userId) => {
  const user = await db.insertUser({ userId, password: '' });
  return user;
};
