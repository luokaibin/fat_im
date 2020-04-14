import redis from 'redis';

const client = redis.createClient('port','ip',{auth_pass: "wltyxgy1BW"});

client.on('error',function(err){
  console.log('redis链接出错', err)
  return client;
});

export const setItem = (key, value, time) => {
  return new Promise((reslove,reject) => {
    client.set(`FatChat_${key}`, value, 'EX', time);
    reslove();
  })
};

export const getItem = (key) => {
  return new Promise((reslove,reject) => {
    client.get(`FatChat_${key}`, (err,data) => {
      if(err) {
        reject(err)
      } else {
        reslove(data);
      }
    })
  })
}
export const hsetItem = (key, value) => {
  return new Promise((reslove, reject) => {
    client.hset('FatChat_user_online_list', key, value, (err,res) => {
      reslove();
    })
  })
}
export const hgetall = key => {
  return new Promise((reslove,reject) => {
    client.hgetall(key, (err, res) => {
      reslove(res);
    })
  })
}
export const hdel = key => {
  return new Promise((reslove, reject) => {
    client.hdel('FatChat_user_online_list', key, (err,res) => {
      reslove();
    })
  })
}