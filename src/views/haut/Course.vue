<template>
  <div>
    <vt-button size="macos" type="primary" @click="test">
      进入页面后点我刷新课程信息
    </vt-button>
    <!-- {{ course.list }} -->
    <v-alert v-show="errorShow" variant="outlined" type="error" prominent>
      <template #text>{{ errorMsg }}</template>
      <template #append>
        <v-btn size="small" variant="text">Sing in</v-btn>
      </template>
    </v-alert>
    <div v-for="c in course.list" :key="c.semester">
      <p v-show="c.semester >= 5" class="text-2xl mt-14 mb-6">
        赛季 {{ c.semester }}
      </p>
      <v-row v-if="c.semester >= 5">
        <v-col md="6" cols="12">
          <v-card>
            <v-tabs v-model="courseTab[c.semester]">
              <v-tab
                v-for="cc in c.course"
                :key="cc.course_id"
                :value="cc.course_id"
                color="secondary"
              >
                {{ cc.course_name }}</v-tab
              >
              <!-- <v-tab value="two" color="secondary"> More </v-tab> -->
            </v-tabs>
            <v-card-text>
              <v-window v-model="courseTab[c.semester]">
                <v-window-item
                  v-for="ct in c.course"
                  :key="ct.course_id"
                  :value="ct.course_id"
                >
                  <v-card-title>
                    {{ ct.type }} {{ ct.course_id }}
                  </v-card-title>
                  <v-row>
                    <v-col md="4">
                      <v-img
                        class="mt-5"
                        :src="`https://api.jinkex.com/files?path=${ct.course_fm}&school_host=haut.hnscen.cn`"
                      />
                    </v-col>
                    <v-col md="8">
                      <v-card-text>
                        <br />
                        <v-row justify="space-between">
                          <v-col md="4">课程视频</v-col>
                          <v-col md="4">
                            进度({{ ct.chapter_complete }}/{{ ct.video_count }})
                          </v-col>
                        </v-row>
                        <br />
                        <v-progress-linear
                          :model-value="ct.chapter_complete"
                          :max="ct.video_count"
                          color="primary"
                          buffer-value="1"
                          height="10"
                          stream
                        ></v-progress-linear>
                        <br />
                        <v-row justify="end">
                          <v-btn
                            variant="outlined"
                            flat
                            color=""
                            class="ma-3"
                            :disabled="ct.video_count == ct.chapter_complete"
                            @click="
                              videoReady(
                                ct.course_id,
                                `/${ct.course_id}/${ct.open_id}`,
                              )
                            "
                          >
                            开 始
                          </v-btn>
                          <v-btn
                            color="info"
                            icon
                            class="ma-3"
                            variant="outlined"
                            size="small"
                          >
                            <v-icon>mdi-cached</v-icon>
                          </v-btn>
                        </v-row>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card-text>
            <!-- <v-tabs v-model="tab" class="tab-index">
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item" class="mt-2">
              <v-card-title> Navigation Card </v-card-title>
              <v-card-text v-text="text"></v-card-text>

              <v-card-text>
                <v-btn color="primary"> Learn More </v-btn>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items> -->
          </v-card>
        </v-col>
        <v-col md="6" cols="12">
          <v-card>
            <v-card-text>
              <v-window v-model="courseTab[c.semester]">
                <v-window-item
                  v-for="ct in c.course"
                  :key="ct.course_id"
                  :value="ct.course_id"
                >
                  <v-card-title>
                    <div v-if="videos.enable == ct.course_id">
                      准备就绪
                      <p>
                        {{ videos.title }} 视频数量：{{ videos.list.length }}
                        ):
                        <vt-button
                          type="warning"
                          size="mini"
                          plain
                          @click="videoStart"
                          >启动</vt-button
                        >
                      </p>
                    </div>
                    <div v-else>
                      <h4>{{ ct.course_name }}</h4>
                      <v-text
                        class="font-weight-light text--disabled"
                        style="font-size: 0.8rem"
                      >
                        刷视频，请请点击左侧开始
                      </v-text>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div
                      :id="`vt-video-console-${ct.course_id}`"
                      style="max-height: 145px; overflow-y: scroll"
                    >
                      ...
                    </div>
                  </v-card-text>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, reactive, ref, computed } from 'vue'
import { queryCourse, queryClassRoom } from '@/apis/haut/course'
import { useHautStore } from '@/store/modules/haut'
import { videoRun } from '@/utils/haut'

const { proxy } = getCurrentInstance()
const haut = useHautStore()
const errorMsg = ref('')
const errorShow = ref(false)
const courseTab = reactive([])
const videoId = ref(null)
const m = proxy.$msg
const token = haut.getToken

const course = reactive({
  list: [],
  // list: [
  //   {
  //     semester: 5,
  //     time: {
  //       batch_id: 52,
  //       start: '2021-03-01 00:00:00',
  //       end: '2021-06-25 00:00:00',
  //       semester: 5,
  //     },
  //     course: [
  //       {
  //         course_id: 801,
  //         course_name: '数据库原理与应用',
  //         course_fm: 'jinke/20201026/f28d141f8f41a933b8cdc50277cda020.png',
  //         semester: 5,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 469,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-03-11 00:00:00',
  //         open_end: '2031-03-01 00:00:00',
  //         chapter_complete: 66,
  //         isfree: 0,
  //         chapter_count: 69,
  //         video_count: 66,
  //         ispass: 1,
  //       },
  //       {
  //         course_id: 613,
  //         course_name: '软件工程',
  //         course_fm: 'jinke/20201026/f6ccbb42cdcd74eb651bdb367f926975.jpg',
  //         semester: 5,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 470,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-03-11 00:00:00',
  //         open_end: '2031-03-01 00:00:00',
  //         chapter_complete: 56,
  //         isfree: 0,
  //         chapter_count: 63,
  //         video_count: 60,
  //         ispass: 1,
  //       },
  //       {
  //         course_id: 502,
  //         course_name: '单片机及其应用',
  //         course_fm: 'jinke/20201116/b8efa550bcc3605e9ff781f2bea0814a.jpg',
  //         semester: 5,
  //         gredit: '0.0',
  //         type: '选修课',
  //         test_type: '在线考试',
  //         open_id: 471,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-03-11 00:00:00',
  //         open_end: '2031-03-01 00:00:00',
  //         chapter_complete: 30,
  //         isfree: 0,
  //         chapter_count: 33,
  //         video_count: 30,
  //         ispass: 1,
  //       },
  //     ],
  //   },
  //   {
  //     semester: 6,
  //     time: {
  //       batch_id: 52,
  //       start: '2021-09-05 00:00:00',
  //       end: '2021-12-25 00:00:00',
  //       semester: 6,
  //     },
  //     course: [
  //       {
  //         course_id: 636,
  //         course_name: '计算机网络技术',
  //         course_fm: 'jinke/20200827/3b9a0571023c35668b706d78f16736d7.jpg',
  //         semester: 6,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 490,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-03-11 00:00:00',
  //         open_end: '2030-03-01 00:00:00',
  //         chapter_complete: 0,
  //         isfree: 0,
  //         chapter_count: 55,
  //         video_count: 52,
  //         ispass: 1,
  //       },
  //       {
  //         course_id: 1049,
  //         course_name: '微机原理及接口技术',
  //         course_fm: '20210218/c666c90804e0d4d3630a29ab47cf39dc.jpg',
  //         semester: 6,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 491,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-03-11 00:00:00',
  //         open_end: '2031-03-01 00:00:00',
  //         chapter_complete: 0,
  //         isfree: 0,
  //         chapter_count: 46,
  //         video_count: 43,
  //         ispass: 1,
  //       },
  //       {
  //         course_id: 4275,
  //         course_name: '互联网应用开发',
  //         course_fm: 'jinke/20210624/d26a1816c82b5b9fe8b65c5d2185c6c5.png',
  //         semester: 6,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 1447,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-06-25 00:00:00',
  //         open_end: '2031-06-27 15:05:38',
  //         chapter_complete: 0,
  //         isfree: 0,
  //         chapter_count: 41,
  //         video_count: 38,
  //         ispass: 1,
  //       },
  //     ],
  //   },
  //   {
  //     semester: 7,
  //     time: {
  //       batch_id: 52,
  //       start: '2022-03-01 00:00:00',
  //       end: '2022-06-30 00:00:00',
  //       semester: 7,
  //     },
  //     course: [
  //       {
  //         course_id: 1318,
  //         course_name: 'Java语言程序设计',
  //         course_fm: 'jinke/20201119/18a613ba6780ba8ea566530e78eea672.jpg',
  //         semester: 7,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 450,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-03-11 00:00:00',
  //         open_end: '2028-03-02 18:52:29',
  //         chapter_complete: 0,
  //         isfree: 0,
  //         chapter_count: 92,
  //         video_count: 89,
  //         ispass: 0,
  //       },
  //       {
  //         course_id: 2746,
  //         course_name: '计算机系统结构',
  //         course_fm: 'jinke/20201225/c9e5de429ff412b82efe7893cb21018b.png',
  //         semester: 7,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 749,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-03-19 00:00:00',
  //         open_end: '2031-03-29 00:00:00',
  //         chapter_complete: 0,
  //         isfree: 0,
  //         chapter_count: 62,
  //         video_count: 59,
  //         ispass: 0,
  //       },
  //       {
  //         course_id: 5110,
  //         course_name: '多媒体制作',
  //         course_fm: 'jinke/20211103/0240868283a512cacbf10d45fc603e5b.jpg',
  //         semester: 7,
  //         gredit: '0.0',
  //         type: '必修课',
  //         test_type: '在线考试',
  //         open_id: 2307,
  //         rec_status: 'can study',
  //         rec_status_code: 2,
  //         open_start: '2021-12-14 00:00:00',
  //         open_end: '2031-12-06 00:00:00',
  //         chapter_complete: 0,
  //         isfree: 0,
  //         chapter_count: 35,
  //         video_count: 32,
  //         ispass: 0,
  //       },
  //     ],
  //   },
  // ],
})

const videos = reactive({
  path: '',
  list: [],
  title: '',
  enable: false,
  course: {},
})

const print = async val => {
  const vc = document.getElementById(`vt-video-console-${videoId.value}`)
  vc.innerHTML += `<br />${new Date().toLocaleString()} :  ${val}`
  vc.scrollTop = vc.scrollHeight
}

const test = () => {
  if (!token) return m.error('Error', { details: 'Need Token' })
  queryCourse(token)
    .then(res => {
      errorShow.value = false
      course.list = res.data
    })
    .catch(e => {
      errorShow.value = true
      errorMsg.value = e.message
    })
}

const videoReady = (id, path) => {
  videoId.value = id
  if (!token) return m.error('Error', { details: 'Need Token' })
  queryClassRoom(path, token).then(res => {
    console.log(56, res)
    if (res.data.course.id) {
      videos.path = path
      videos.token = token
      videos.title = res.data.course.name
      const chapterData = res.data.chapter
      const list = []
      chapterData.forEach(cd => {
        const chapterChild = cd.children
        chapterChild.forEach(cc => {
          if (cc.name.indexOf('在线作业') > -1) {
            return
          }
          list.push({
            iz: cd.id,
            ic: cc.id,
            icn: cc.name,
            is: true,
          })
        })
      })
      videos.course.path = videos.list = list
      videos.enable = id
    }
  })
}

const videoStart = () => {
  print('正在进行中... 也可打开控制台查看详情')
  videoRun(videos, print)
}

onMounted(() => {})
</script>
