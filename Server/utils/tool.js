import {User} from '../config/db';

export const create_validate_code = () => {
  return new Promise((reslove,reject) => {
    const code = parseInt(Math.random() * 1000000);
    reslove(code);
  })
};

export const user_find = async (data) => {
    const [nameOrEmail] = await User.find(data);
    return nameOrEmail;
}
export const user_save = async (data) => {
  const userInfo = new User(data);
  const state = await userInfo.save();
  return state;
}

