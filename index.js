// 加载爬虫文件
const Profile = require('./models/profile')
const result = require('./spider')
result().then(r => Profile.bulkCreate(r))
