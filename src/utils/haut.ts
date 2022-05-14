// const vk = 3
// const tk =
//   'Mnh0TjVXaXRNN0lERjMwYTMrTTFwUU9IOUVjM2ZPSXlqMFRpeGZtVDZnblpGdHVNWnJzcXpkNE4vNTNYaFFBM2R6aU5GQkYwMnYzUlEyQmZMazNLNWc9PQ,,'
/**
 * vk的值分别为下列内容
 * 1: 计算机网络技术
 * 2: 微机原理及接口技术
 * 3: 互联网应用开发
 */

const fetchInter: any = null
let callback: any = null
let tk: any = null
let watchTime: any = 300

export const videoRun = async (videos: any, cb: Function) => {
  callback = cb
  tk = videos.token
  const subUrl = videos.path
  const videoData = videos.list
  const baseUrl = `https://api.jinkex.com/edu/v1/classroom/${subUrl}/rec/`
  await p(`开始课程【${videos.title}】`)
  videoFetch(videoData, baseUrl)
  await p(`确认执行完毕 1`)
  videoFetch(videoData, baseUrl)
  await p(`确认执行完毕 2`)
  videoFetch(videoData, baseUrl)
  await p(`应该执行完毕了`)
}

const p = async (val: string, time?: number) => {
  await new Promise(resolve => setTimeout(resolve, time || 300))
  callback(val)
}

function sleep(n: any) {
  const start = new Date().getTime()
  while (true) {
    if (new Date().getTime() - start > n) {
      break
    }
  }
}

async function videoFetch(videoData: any, url: string) {
  let sFlag = true
  let tFlag = false
  videoData.forEach((vd: any) => {
    console.log(vd.is)

    sFlag = vd.is
    if (sFlag) tFlag = true
  })
  if (tFlag) {
    videoData.forEach((vd: any) => {
      // console.log(vd.ic)
      startFetch(url, vd)
      p('loading...')
      // sleep(100)
    })
  } else {
    p('******本课程已全部完成******')
    clearInterval(fetchInter)
  }
}

async function startFetch(url: string, vd: any) {
  if (!vd.is) {
    return
  }
  fetch(url + vd.ic, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8;',
    },
    body: JSON.stringify({
      hasTime: 600,
      lastTime: watchTime + 600,
      school_host: 'haut.hnscen.cn',
      token: tk,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        if (Number(data.data.progress) < 1) {
          vd.is = true
          watchTime = data.data.watch_time
          p(`课程《${vd.icn}》进度：${Number(data.data.progress) * 100}%`)
        } else {
          vd.is = false
          p(`课程《${vd.icn}》已完成`)
        }
      } else {
        p('---next fetch---')
      }
    })
    .catch(e => {
      p(e)
    })
}
