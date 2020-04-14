// 引入redis
import {setItem, getItem, hsetItem, hgetall, hdel} from './config/redis';

// const redis = async () => {
  
//   console.log('查询全部', onlineUserList);
// }
// redis()

const hdelRedis = async () => {
  const onlineUserList = await hgetall('FatChat_user_online_list');
  for (const item in onlineUserList) {
    console.log('项', item)
    // await hdel(item)
  }
}
hdelRedis();