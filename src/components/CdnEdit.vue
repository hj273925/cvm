<template>
<div class="dao-setting-layout" style="margin:2em">
  <div class="dao-setting-layout-title">
    <div class="dao-setting-title">CDN加速</div>
  </div>
  <div class="dao-setting-section">
    <div class="dao-setting-item">
      <div class="dao-setting-label">域名</div>
      <div class="dao-setting-content">
        <div class="column is-12">
          <p class="control has-icon has-icon-right">
            <dao-input type = "text"
                        v-model="record.params.host"
                        icon-inside
                        :status = 'nameError'
                        :message = 'nameMsg'
                        @blur = 'checkName(record.params.host)'></dao-input>
          </p>
        </div>
      </div>
    </div>
    <div class="dao-setting-item">
      <div class="dao-setting-label">源站设置</div>
      <div class="dao-setting-content">
        <dao-input  type="text"
                   v-model="record.params.origin"
                  icon-inside
                  :status = 'hostError'
                  :message = 'hostMsg'
                  @blur = 'checkHost(record.params.origin)'></dao-input>
      </div>
    </div>
    <div class="dao-setting-item">
      <div class="dao-setting-label">缓存策略</div>
      <div class="dao-setting-content">
        <table class="dao-table row" style="width:40em">
          <thead>
            <tr>
              <th>类型</th>
              <th>内容</th>
              <th>刷新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cache,idx) in record.params.cache">
              <td>
                <div v-if="idx>0">
                  <dao-select v-model = "selectoption[idx]" @change = 'selectType(selectoption[idx],idx)'>
                    <dao-option-group>
                      <dao-option v-for = "item in cacheTypes" :value="item.value" :label="item.label"></dao-option>
                    </dao-option-group>
                  </dao-select>
                </div>
                <div v-else>
                  全部
                </div>
              </td>
              <td>
                <div v-if="idx>0">
                  <dao-input v-model="cache[1]" placeholder=""></dao-input>
                </div>
                <div v-else>
                  {{cache[1]}}
                </div>
              </td>
              <td>
                <dao-input type = "number" v-model="cache[2]" :min="0" :max="9999999"></dao-input> 秒</td>
              <td>
                <Button type="text" v-if="idx>0" v-on:click="delCacheItem(idx)"><Icon type="trash-a" :size="18"></Icon></Button>
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="primary" size="small" v-on:click="addCacheItem()">新增</Button>
      </div>
    </div>
  </div>
  <div class="dao-setting-layout-footer">
    <Button type="ghost" @click = 'toList()'>返回列表</Button>
    <Button type="primary" v-on:click="saveIt()" class="right">保 存</Button>
  </div>
</div>
</template>

<script>
export default {
  name: 'cdn_edit',
  data() {
    return {
      cacheTypes: [{
        label: '文件',
        value: 1
      }, {
        label: '目录',
        value: 2
      }, {
        label: '全路径',
        value: 3
      }],
      selectoption: [1],
      nameError: '',
      nameMsg: '',
      hostError: '',
      hostMsg: '',
      record: {
        params: {
          host: '',
          origin: '',
          cache: [
            [0, 'all', 0]
          ]
        }
      }
    }
  },
  vuerify: {
    'record.params.host': [
      'required',
      {
        test: /^(([A-Za-z0-9-~]+)\.)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9])+$/,
        messgae: '域名格式错误！'
      }
    ],
    'record.params.origin': [
      'required',
      {
        test: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])+$/,
        messgae: '资源地址格式错误！'
      }
    ]
  },
  computed: {
    errors() {
      return this.$vuerify.$errors
    },
    invalid() {
      return this.$vuerify.invalid
    }
  },
  created() {
    var self = this
    if (this.$route.params.id !== 'undefined') {
      this.$axios.get(process.env.BASE_URL + '/getById.json?id=' + this.$route.params.id)
        .then(function (res) {
          var data = res.data.data
          data.params = JSON.parse(data.params)
          self.record = data
        })
        .catch(function (res) {
          console.log(res)
        })
    }
  },
  methods: {
    delCacheItem: function (idx) {
      this.record.params.cache.splice(idx, 1)
    },
    addCacheItem: function () {
      this.record.params.cache.push([1, '.jpg;.png', 3600])
      this.selectoption.push(1)
    },
    selectType: function (type, index) {
      switch (type) {
        case 1:
          this.record.params.cache[index][1] = '.jpg;.png'
          break
        case 2:
          this.record.params.cache[index][1] = '.doc'
          break
        case 3:
          this.record.params.cache[index][1] = '/'
          break
      }
    },
    checkName: function (name) {
      const reg = /^(([A-Za-z0-9-~]+)\.)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9])+$/
      if (name === '') {
        this.$data.nameError = 'error'
        this.$data.nameMsg = '域名不能为空！'
      } else if (!reg.test(name)) {
        this.$data.nameError = 'error'
        this.$data.nameMsg = '域名格式错误！'
      } else {
        this.$data.nameError = ''
      }
    },
    checkHost: function (host) {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])+$/
      if (host === '') {
        this.$data.hostError = 'error'
        this.$data.hostMsg = '资源地址不能为空！'
      } else if (!reg.test(host)) {
        this.$data.hostError = 'error'
        this.$data.hostMsg = '资源地址格式错误！'
      } else {
        this.$data.hostError = ''
      }
    },
    saveIt: function () {
      var self = this
      if (this.record.params.host === '') {
        this.$data.nameError = 'error'
        this.$data.nameMsg = '域名不能为空！'
      } else {
        this.$data.nameError = ''
      };
      if (this.record.params.origin === '') {
        this.$data.hostError = 'error'
        this.$data.hostMsg = '资源地址不能为空！'
      } else {
        this.$data.hostError = ''
      };
      console.log(this.$vuerify.$errors)
      if (this.$vuerify.check()) {
        var act = this.record.id ? ('/update/' + this.record.id + '.json') : '/save.json'
        this.$axios.post(process.env.BASE_URL + act, this.record.params)
          .then(function (response) {
            console.log(response)
            self.$noty.success('创建成功！')
          })
          .catch(function (error) {
            console.log(error)
            self.$noty.error('创建失败！')
          })
      } else {
        console.log('xxxxxxxxxx')
      }
    },
    toList: function () {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  .right{
    float: right;
  }
</style>
