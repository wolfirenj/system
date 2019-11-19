const baseUrl = '/api'
//登录
const login = baseUrl + '/login';
//添加管理员
const addManage=baseUrl+'/addManage'
//查询管理员
const findManage=baseUrl+'/findManage'
//删除管理员
const delManage=baseUrl+'/delManage'
//修改管理员
const updateManage=baseUrl+'/updateManage'

//添加用户
const addUser=baseUrl+'/addUser'
//查询用户
const findUser=baseUrl+'/findUser'
//删除用户
const delUser=baseUrl+'/delUser'
//修改用户
const updateUser=baseUrl+'/updateUser'

//添加通知
const addNews=baseUrl+'/addNews'
//查询通知
const findNews=baseUrl+'/findNews'
//删除通知
const delNews=baseUrl+'/delNews'
//修改通知
const updateNews=baseUrl+'/updateNews'

//添加设备
const addDevice=baseUrl+'/addDevice'
//查询设备
const findDevice=baseUrl+'/findDevice'
//删除设备
const delDevice=baseUrl+'/delDevice'
//修改设备
const updateDevice=baseUrl+'/updateDevice'

//退出
const exit=baseUrl+'/exit'

//购买


export default {
    login,
    addManage,
    findManage,
    delManage,
    updateManage,

    addUser,
    findUser,
    delUser,
    updateUser,

    addNews,
    findNews,
    delNews,
    updateNews,

    addDevice,
    findDevice,
    delDevice,
    updateDevice,

    exit,
    baseUrl
}