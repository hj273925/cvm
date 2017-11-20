<template>
  <div>
    <dao-steps v-model="dwonModel">
      <!-- 一级步骤 -->
      <dao-step
        slot="step"
        index="1">
        <dao-substep
          index="1-1"
          title="选择租户"
          :no-click = 'true'
          :no-active = 'true'>
        </dao-substep>
      </dao-step>
      <dao-step-content
        slot="content"
        index="1-1"
      >
      <div class="dao-setting-layout" style="margin:2em">
        <div class="dao-setting-layout-title">
          <div class="dao-setting-title">选择租户</div>
        </div>
        <div class="dao-setting-section">
        </div>
        <div class="dao-setting-layout-footer">
          <Button type="ghost" @click = 'toList()'>返回列表</Button>
          <Button type="primary" v-on:click="next()" class="right">下一步</Button>
        </div>
      </div>
    </dao-step-content>
      <dao-step
        slot="step"
        index="2">
        <dao-substep
          index="2-1"
          title="选择规格"
          :no-click = 'true'>
        </dao-substep>
      </dao-step>
      <dao-step-content
        slot="content"
        index="2-1"
      >
        <div class="dao-setting-layout" style="margin:2em">
          <div class="dao-setting-layout-title">
            <div class="dao-setting-title">选择规格</div>
          </div>
          <div class="dao-setting-section">
            <dao-select id="system" placeholder="选择地域" v-model="record.Region" @change = 'selectRegion'>
              <dao-option v-for="item in regions" :key="item.Region" :value="item.Region" >
                {{ item.RegionName}}
              </dao-option>
            </dao-select>
            <dao-select id="system" placeholder="选择可用区域" v-model="record.Zone" @change = 'selectZone' style = 'margin-left: 20px'>
              <dao-option v-for="item in zones" :key="item.Zone" :value="item.Zone" >
                {{ item.ZoneName}}
              </dao-option>
            </dao-select>
            <dao-radio-group type="block" style = 'margin-top: 20px' name = 'tier'>

              <dao-radio
                v-for = "item in tiers"
                :key="item.id"
                v-model="record.planId"
                :label = 'item.id'>
                {{item.typeName}}
                <span class="tier-des">{{item.quota}}<span style="width: 20px;display: inline-block"></span>{{item.Zname}}</span>
              </dao-radio>

            </dao-radio-group>
          </div>
          <div class="dao-setting-layout-footer">
            <Button type="ghost" @click = 'toList()'>返回列表</Button>
            <Button type="primary" v-on:click="next()" class="right">下一步</Button>
          </div>
        </div>
      </dao-step-content>
      <dao-step
        slot="step"
        index="3">
        <dao-substep
          index="3-1"
          title="参数设置"
          :no-click = 'true'>
        </dao-substep>
      </dao-step>
      <dao-step-content
        slot="content"
        index="3-1"
      >
        <div class="dao-setting-layout" style="margin:2em">
          <div class="dao-setting-layout-title">
            <div class="dao-setting-title">参数设置</div>
          </div>
          <div class="dao-setting-section">
            <div class="dao-setting-item">
              <div class="dao-setting-label">操作系统</div>
              <div class="dao-setting-content">
                <dao-select id="system" placeholder="选择操作系统" v-model="system" @change = 'selectSystem'>
                  <dao-option v-for="item in systems" :key="item.OsName" :value="item.OsName" >
                    {{ item.OsName}}
                  </dao-option>
                </dao-select>
              </div>
            </div>
          </div>
          <div class="dao-setting-section">
            <div class="dao-setting-item">
              <div class="dao-setting-label">系统版本</div>
              <div class="dao-setting-content">
                <dao-select id="version" placeholder="选择系统版本" v-model="record.ImageId">
                  <dao-option v-for="item in versions" :key="item.ImageId" :value="item.ImageId" >
                    {{ item.OsName}}
                  </dao-option>
                </dao-select>
              </div>
            </div>
          </div>
          <div class="dao-setting-section">
            <div class="dao-setting-item">
              <div class="dao-setting-label">硬盘</div>
              <div class="dao-setting-content">
                <dao-input  type="number"
                             v-model="record.DiskSize"
                             icon-inside
                             :status = 'hardDiskError'
                             :message = 'hardDiskMsg'></dao-input>
                <span>G</span>
              </div>
            </div>
          </div>
          <div class="dao-setting-section">
            <div class="dao-setting-item">
              <div class="dao-setting-label">带宽</div>
              <div class="dao-setting-content">
                <dao-input  type="text"
                             v-model="record.bandWidth"
                             icon-inside
                             :status = 'bandwidthError'
                             :message = 'bandwidthMsg'></dao-input>
              </div>
            </div>
          </div>
          <div class="dao-setting-section">
            <div class="dao-setting-item">
              <div class="dao-setting-label">主机名</div>
              <div class="dao-setting-content">
                <dao-input  type="text"
                             v-model="record.InstanceName"
                             icon-inside
                             :status = 'masterError'
                             :message = 'masterMsg'
                             @blur = 'checkInstanceName(record.InstanceName)'></dao-input>
              </div>
            </div>
          </div>
          <div class="dao-setting-section">
            <div class="dao-setting-item">
              <div class="dao-setting-label">密码</div>
              <div class="dao-setting-content">
                <dao-input  type="text"
                             v-model="record.Password"
                             icon-inside
                             :status = 'passwordError'
                             :message = 'passwordMsg'
                             @blur = 'checkPassWord(record.Password)'></dao-input>
              </div>
            </div>
          </div>
          <div class="dao-setting-section">
            <div class="dao-setting-item">
              <div class="dao-setting-label">描述</div>
              <div class="dao-setting-content">
                <textarea rows="3" style=" width:287px " type="text"
                             v-model="record.Description"
                             icon-inside
                             :status = 'descriptionError'
                             :message = 'descriptionMsg'
                             @blur = 'checkPassWord(record.Description)'></textarea>
              </div>
            </div>
          </div>
          <div class="dao-setting-layout-footer">
            <Button type="ghost" @click = 'pre()'>上一步</Button>
            <Button type="primary" v-on:click="next()" class="right">下一步</Button>
          </div>
        </div>
      </dao-step-content>
      <dao-step
        slot="step"
        index="4">
        <dao-substep
          index="4-1"
          title="确定订购"
          :no-click = 'true'>
        </dao-substep>
      </dao-step>
      <dao-step-content
        slot="content"
        index="4-1"
      >
        <div class="dao-setting-layout" style="margin:2em">
          <div class="dao-setting-layout-title">
            <div class="dao-setting-title">确定订购</div>
          </div>
          <div class="dao-setting-section">
              <table class="dao-table slat">
                <thead>
                <tr>
                  <th>
                    <span>类名</span>
                  </th>
                  <th>
                    <span>值</span>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="key,value in record">
                  <td class="key">
                    <div class="value">{{format(value)}}</div>
                  </td>
                  <td class="value">
                    <div class="key" style="text-align: left">{{formatValue(key,value)}}</div>
                  </td>
                </tr>
                </tbody>
              </table>
          </div>
          <div class="dao-setting-layout-footer">
            <Button type="ghost" @click = 'pre()'>上一步</Button>
            <Button type="primary" v-on:click="save()" class="right">确定</Button>
          </div>
        </div>
      </dao-step-content>
      <dao-step
        slot="step"
        index="5">
        <dao-substep
          index="5-1"
          title="完成"
          :no-click = 'true'>
        </dao-substep>
      </dao-step>
      <dao-step-content
        slot="content"
        index="5-1"
      >
        <div class="dao-setting-layout" style="margin:2em">
          <div class="dao-setting-layout-title">
            <div class="dao-setting-title">完成</div>
          </div>
          <div class="dao-setting-section">
            订购完成！
          </div>
          <div class="dao-setting-layout-footer">
            <Button type="ghost" @click = 'toList()'>返回列表</Button>
          </div>
        </div>
      </dao-step-content>
    </dao-steps>
  </div>
</template>

<script>
var Child = {
  props: {myMessage: {
    type: String,
    default: 'hello'
  }},
  data: function () {
    return { counter: this.myMessage.toUpperCase() }
  },
  computed: {
    normalizedSize: function () {
      return this.myMessage.trim().toUpperCase()
    }
  },
  template: '<div @click = "check">{{normalizedSize}}</div>',
  methods: {
    check: function () {
      this.myMessage = this.myMessage
      this.$emit('check', 'hell0')
    }
  }
}
export default {
  name: 'cvm_create',
  components: {
    'my-component': Child
  },
  data() {
    return {
      index: 1,
      sex: 'male',
      dwonModel: '2-1',
      steps: ['1-1', '2-1', '3-1', '4-1', '5-1'],
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
      system: '',
      systems: [],
      versions: [],
      region: '',
      regions: [],
      zone: '',
      zones: [],
      tier: '',
      tiers: [],
      hardDiskError: '',
      hardDiskMsg: '',
      bandwidthError: '',
      bandwidthMsg: '',
      masterError: '',
      masterMsg: '',
      passwordError: '',
      passwordMsg: '',
      bandWidth: '',
      descriptionError: '',
      descriptionMsg: '',
      record: {
        Region: '',
        Zone: '',
        planId: '',
        ImageId: '',
        InstanceName: '',
        DiskSize: '',
        Password: '',
        InstanceCount: '1',
        Description: ''
      }
    }
  },
  vuerify: {
    'host': [
      'required',
      {
        test: /^(([A-Za-z0-9-~]+)\.)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9])+$/,
        messgae: '域名格式错误！'
      }
    ],
    'origin': [
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
    this.$axios.get(process.env.BASE_URL + '/cvm/describeRegions')
      .then(function (res) {
        self.regions = res.data.body
        self.record.Region = res.data.body[0].Region
      })
      .then(function (res) {
        return self.$axios.get(process.env.BASE_URL + '/cvm/getImageList/' + self.record.Region)
      })
      .then(function (res) {
        self.systems = res.data.body
      })
      .then(function (res) {
        return self.$axios.get(process.env.BASE_URL + '/cvm/DescribeZones/' + self.record.Region)
      })
      .then(function (res) {
        self.zones = res.data.body
        self.record.Zone = res.data.body[0].Zone
      })
      .then(function (res) {
        return self.$axios.get(process.env.BASE_URL + '/plan/getPlans/' + self.record.Zone)
      })
      .then(function (res) {
        self.tiers = res.data.body
      })
      .catch(function (res) {
        console.log(res)
      })
  },
  methods: {
    check: function (name) {
      console.log(name)
    },
    // 选择系统
    selectSystem: function (items) {
      var sys = this.systems.filter(function (item) {
        return item.OsName === items
      })
      this.versions = sys[0].OsList
    },
    // 选择地域
    selectRegion: function (item) {
      var self = this
      this.$axios.get(process.env.BASE_URL + '/cvm/DescribeZones/' + item)
        .then(function (res) {
          self.zones = res.data.body
        })
        .catch(function (res) {
          console.log(res)
        })
    },
    // 选择区域
    selectZone: function (item) {
      var self = this
      this.$axios.get(process.env.BASE_URL + '/plan/getPlans/' + item)
        .then(function (res) {
          self.tiers = res.data.body
        })
        .catch(function (res) {
          console.log(res)
        })
    },
    checkHardDisk: function (name) {
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
    checkInstanceName: function (data) {
      console.log(data)
    },
    checkPassWord: function (data) {
      console.log(data)
    },
    toList: function () {
      this.$router.push('/')
    },
    // 转换类名
    format: function (data) {
      let status = ''
      switch (data) {
        case 'Region':
          status = '地域'
          break
        case 'Zone':
          status = '区域'
          break
        case 'planId':
          status = '规格'
          break
        case 'ImageId':
          status = '系统版本'
          break
        case 'DiskSize':
          status = '硬盘'
          break
        case 'InstanceName':
          status = '主机名'
          break
        case 'InstanceCount':
          status = '数量'
          break
        case 'Password':
          status = '密码'
          break
        case 'Description':
          status = '描述'
          break
      }
      return status
    },
    formatValue: function (key, value) {
      let keys = ''
      switch (value) {
        case 'Region':
          keys = this.formatRegion(key)
          break
        case 'Zone':
          keys = this.formatZone(key)
          break
        case 'planId':
          keys = this.formatPlant(key)
          break
        case 'ImageId':
          keys = this.formatSystem(key)
          break
        default:
          keys = key
          break
      }
      return keys
    },
    formatRegion: function (value) {
      const region = this.regions.filter(function (item) {
        return item.Region === value
      })
      if (region.length) {
        return region[0].RegionName
      } else {
        return ''
      }
    },
    formatZone: function (value) {
      const zone = this.zones.filter(function (item) {
        return item.Zone === value
      })
      if (zone.length) {
        return zone[0].ZoneName
      } else {
        return ''
      }
    },
    formatPlant: function (value) {
      const plant = this.tiers.filter(function (item) {
        return item.id === value
      })
      if (plant.length) {
        return plant[0].typeName
      } else {
        return ''
      }
    },
    formatSystem: function (value) {
      const system = this.versions.filter(function (item) {
        return item.ImageId === value
      })
      if (system.length) {
        return system[0].OsName
      } else {
        return ''
      }
    },
    // 提交数据
    save: function () {
      var self = this
      this.$axios.post(process.env.BASE_URL + '/cvm/createInstance', {
        ...this.record
      })
        .then(function (res) {
          self.dwonModel = self.steps[++self.index]
        })
        .catch(function (res) {
          console.log(res)
          self.$noty.error('创建失败！')
        })
    },
    pre: function () {
      this.dwonModel = this.steps[--this.index]
    },
    next: function () {
      if (this.index === 4) {
        this.index = 3
      }
      this.dwonModel = this.steps[++this.index]
    }
  }
}
</script>
<style>
  .right{
    float: right;
  }
  .tier-des{
    position: absolute;
    right: 30px;
    padding-bottom: 20px;
  }
  .dao-steps-content{
    min-width:700px;
    margin-left: 200px;
    margin-top: 20px;
  }
  .dao-steps-sidebar{
    position: fixed;
    top: 20px;
    left: 30px;
  }
  tr{
    margin-left: 20px;
  }
</style>
