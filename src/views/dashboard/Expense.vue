<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="username"
            :counter="10"
            label="User Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="day"
            :counter="10"
            label="Day"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            :loading="queryLoading"
            :disabled="queryLoading"
            color="secondary"
            @click="queryTableData()"
          >
            查 询
          </v-btn>
          &nbsp;&nbsp;&nbsp;
          <v-btn :color="addShow ? '' : 'primary'" @click="openAdd()">
            {{ addShow ? '关 闭' : '新 增' }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="24" md="8">
          <v-table v-show="data.tableData.length > 0">
            <thead>
              <tr>
                <th class="text-left">开始</th>
                <th class="text-left">结束</th>
                <th class="text-left">说明</th>
                <th class="text-left">花费</th>
                <th class="text-left">抬头</th>
                <th class="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data.tableData" :key="item._id">
                <td>{{ item.startTime }}</td>
                <td>{{ item.endTime }}</td>
                <td>
                  <v-tooltip bottom>
                    <template #activator="{ props }">
                      <span v-bind="props">{{ item.type }} </span>
                    </template>
                    <span>{{ item.desc }}</span>
                  </v-tooltip>
                </td>
                <td>
                  <v-tooltip bottom>
                    <template #activator="{ props }">
                      <span v-bind="props"
                        >{{ item.cost }} {{ item.unit }}</span
                      >
                    </template>
                    <span>{{ item.capital }}</span>
                  </v-tooltip>
                </td>
                <td>{{ item.company }}</td>
                <td>
                  <v-btn
                    size="x-small"
                    variant="outlined"
                    icon
                    color="secondary"
                    @click="delMessage"
                    @dblclick="delOpen(item._id)"
                  >
                    <v-icon>mdi-delete-forever-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="12" md="4">
          <v-form v-show="addShow" ref="form" v-model="vaild" lazy-validation>
            <v-text-field
              v-model="data.info.type"
              :counter="10"
              label="Type"
              :rules="r1"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.info.cost"
              :counter="10"
              label="Cost"
              :rules="r1"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.info.startTime"
              :counter="10"
              label="Start Time"
              :rules="r1"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.info.endTime"
              :counter="10"
              label="End Time"
              :rules="r1"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.info.company"
              :counter="30"
              label="Company"
              :rules="r1"
              required
            ></v-text-field>
            <v-text-field
              v-model="data.info.desc"
              :counter="30"
              label="Desc"
              :rules="r1"
              required
            ></v-text-field>
            <!-- <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select> -->
            <v-btn
              :disabled="!valid"
              color="info"
              class="mr-4"
              @click="validate"
            >
              Save
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">
              Reset Form
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { query, add, del } from '@/apis/expense'

const { proxy } = getCurrentInstance() as any

const m = proxy.$msg

const username = ref('')
const day = ref('')
const data = reactive({
  info: {},
  tableData: [],
})
const queryLoading = ref(false)
const addShow = ref(false)
const valid = ref(true)
const form = ref(null)
const r1 = [v => !!v || 'Item is required']

const queryTableData = msg => {
  queryLoading.value = true
  if (!username.value || !day.value) return
  query(username.value, day.value).then(res => {
    if (res.code === 200) {
      msg && m.success('Success', { details: res.message })
      data.tableData = res.data
      queryLoading.value = false
    }
  })
  setTimeout(() => {
    queryLoading.value = false
  }, 3000)
}

const openAdd = () => (addShow.value = !addShow.value)

const addRecord = () => {
  const info = Object.assign({}, data.info)
  info.unit = '元'
  info.capital = proxy.digitUppercase(info.cost)
  add({
    username: username.value,
    day: day.value,
    info,
  }).then(res => {
    if (res.code === 200) {
      m.success('Success', { details: res.message })
      info._id = res.data._id
      data.tableData.unshift(info)
      data.info = {}
      addShow.value = false
    }
  })
}

const validate = () => {
  form.value.validate().then(res => {
    if (res.valid) addRecord()
  })
}

const reset = () => {
  form.value.reset()
}

const delMessage = () => {
  m.warning('Warning', { details: '请双击按钮删除' })
}

const delOpen = _id => {
  del({
    username: username.value,
    day: day.value,
    _id,
  }).then(res => {
    if (res.code === 200) {
      m.success('Success', { details: res.message })
      queryTableData(false)
    }
  })
}

onMounted(() => {
  username.value = 'lalalau'
  day.value = '2022-06-20'
})
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
