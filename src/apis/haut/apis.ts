// import { SCHOOL_HOST, CONFIG_URL } from '@/data/config'
export const LOGIN = '/edu/v1/student/login'
// export const CAPTCHA = `${CONFIG_URL}/edu/v1/student/captcha?school_host=${SCHOOL_HOST}`
export const QUESTION = `/edu/v1/question`
export const SELF = '/edu/v1/student/'
export const LOGOUT = '/edu/v1/student/logout'
//统计信息接口
export const COUNT = '/edu/v1/studentcourse/getcoursecount'
// 选课
export const SELCOURSE = '/edu/v1/studentcourse/selcourse'
// 获取学生课表
export const COURSE = '/edu/v1/studentcourse/getstuentcourse'
export const STUDENT = '/edu/v1/student'
//获取学生成绩表
export const SCORE = '/edu/v1/studentcourse/getstuentscore'
//总评成绩
export const All_SCORE = '/edu/v1/scores/queryOneStudent'
// 通知消息, 获取学生消息列表
export const SELMSG = '/edu/v1/msg/queryself'
export const READMSG = '/edu/v1/msg/'
// 获取学分项
export const GETKV = '/edu/v1/credit/getkv'
// 获取学生自己所有
export const GETSCORElISTS = '/edu/v1/creditrec/getself'
// 学分兑换提交申请
export const CREDITREC = '/edu/v1/creditrec'
//个人信息修改
export const UPDATEAVATAR = '/edu/v1/student/self'
// 进教室
export const ENTER_CLASSROOM = '/edu/v1/classroom'
// 视频获取
export const HW_Player = '/edu/v1/vod/hwPlayer/'
//教师公告
export const COURSENOTICE = '/edu/v1/coursenotice/publish'
//bug反馈
export const BUGSUBMIT = '/edu/v1/feedback'
//提交论文
export const SUBMITDISSERT = '/edu/v1/studentgraduate/savedissert'
//查询单个学生毕业论文
export const QUERYONE = '/edu/v1/studentgraduate/'
//上传毕业材料
export const MYGRADUATE = '/edu/v1/studentgraduate/savefinish'
//申请学位
export const DEGREE = '/edu/v1/studentgraduate/apply'
//获取网站详情
export const SCHOOLMSG = '/edu/v1/schoolconfig'
//学习报告 到课数据
export const INCOURSE = '/edu/v1/studentcourse/incourse'
//学习报告  观看视频
export const VIDEODATA = '/edu/v1/studentcourse/watchvideo'
//学习报告  章节记录、问答记录
export const CHAPTERQUESTION = '/edu/v1/studentreport/'
//资料下载上报
export const DOWNLOADRESOURSE = '/edu/v1/classroom/'

export const FEE_SETTING = '/pay/feeconfig'//获取配置（前台学生缴费时）
export const FEE = '/pay/feerec/pay'//缴费
export const FEE_RECORD = '/pay/feerec/user'//获取用户缴费记录
export const FEE_TIME_RECORD = '/pay/feerec/'//查询记录信息（可用于轮询缴费结果）
export const FEE_TIME = '/pay/feestandard/time'//学费当年缴费时间
export const FEE_COUNT = '/pay/feerec/userCount'//获取用户缴费记录统计
export const USER_INFO = '/edu/v1/userinfo'//学籍
export const RADIO_BTN = '/sadmin/v1/school/infobyurl'//是否开启总评成绩
export const RESETPWD = '/edu/v1/student/reset/card'//学生重置密码