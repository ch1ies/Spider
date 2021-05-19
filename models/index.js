const Profile = require('./profile')

// 初始化时执行一次，在数据库中简历表结构
Profile.sync({force: true}).then(() => {
  console.log('模型同步成功')
})
