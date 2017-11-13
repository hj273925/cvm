<template>
  <div>
    <div class="dao-view-header">
      <div class="header-top">
        <div class="header-img">
          <span class="icon">
            <div class="">
              <svg>
                <use xlink:href="#icon_container-small"></use>
              </svg>
            </div>
          </span>
        </div>
        <div class="header-content">
          <div class="content-top">
            <div class="header-name">CVM</div>
            <div>
              <button class="dao-btn blue" v-on:click="toEdit()">创建实例</button>
            </div>
          </div>
          <div class="content-bottom">
          </div>
        </div>
      </div>
    </div>
    <div class="dao-table-container" style="margin:2em">
      <table class="dao-table slat">
        <thead>
        <tr>
          <th>
            <svg>
              <use xlink:href="#icon_stack-small"></use>
            </svg>
            <span>主机名</span>
          </th>
          <th>
            <svg>
              <use xlink:href="#icon_location"></use>
            </svg>
            <span>IP</span>
          </th>
          <th>
            <svg>
              <use xlink:href="#icon_stack-small"></use>
            </svg>
            <span>区域</span>
          </th>
          <th>
            <svg>
              <use xlink:href="#icon_status"></use>
            </svg>
            <span>状态</span>
          </th>
          <th>
            <svg>
              <use xlink:href="#icon_file-text"></use>
            </svg>
            <span>描述</span>
          </th>
          <th class="operation">

          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items.slice(pagesize*(page - 1),page*pagesize)">
          <td class="name">
            <div class="item-major">{{item.InstanceName}}</div>
          </td>
          <td class="ip">
            <div class="item-major">{{item.IP}}</div>
          </td>
          <td class="host">
            <div class="item-major">{{item.zone_name}}</div>
          </td>
          <td class="status">
            <div class="item-major">{{getStatus(item.status)}}</div>
          </td>
          <td class="description">
            <div class="item-major">{{item.cvm_description}}</div>
          </td>
          <td class="operation">
            <div class="dao-btn-group">
              <button
                class="dao-btn ghost">
                查看详情
              </button>
              <dao-dropdown
                trigger="click"
                :append-to-body="true"
                placement="bottom-start">
                <div class="dao-btn dao-icon ghost">
                  <svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon_down-arrow"></use></svg>
                </div>
                <dao-dropdown-menu slot="list">
                  <dao-dropdown-item :is-divided="true"></dao-dropdown-item>
                  <dao-dropdown-item @click="cvmOnline(item)">启动</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true" v-show = lineStatus(item)></dao-dropdown-item>
                  <dao-dropdown-item @click="cvmOffline(item)">关闭</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true" v-show = offStatus(item)></dao-dropdown-item>
                  <dao-dropdown-item @click="cvmReline(item)">重启</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true" v-show = offStatus(item)></dao-dropdown-item>
                  <dao-dropdown-item @click="editPassword(item)">重置密码</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true" v-show = deleteStatus(item)></dao-dropdown-item>
                  <dao-dropdown-item @click="cvmDeleted(item)" v-show = deleteStatus(item)>删除</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true"></dao-dropdown-item>
                </dao-dropdown-menu>
              </dao-dropdown>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--<empty-state v-show ="!items.length" title-data="暂无数据" id="empty">-->
      <!--</empty-state>-->
      <div class="dao-table-page" v-if="items.length>0">
        <div class="dao-btn-group">
          <button class="dao-btn dao-icon ghost" @click="prev" :disabled="page<=1">
            <svg class="icon">
              <use xlink:href="#icon_caret-left"></use>
            </svg>
          </button>
          <button class="dao-btn dao-icon ghost" @click="next" :disabled="page>=Math.ceil(items.length / pagesize)">
            <svg class="icon">
              <use xlink:href="#icon_caret-right"></use>
            </svg>
          </button>
        </div>
        <span class="dao-table-page-span">
          共 {{ items.length }} 个记录
      </span>
      </div>
      <dao-dialog
        :config="config"
        :visible.sync="visible"
        @dao-dialog-confirm="handleConfirm">
        <div class="dao-setting-section">
          <div class="dao-setting-item">
            <div class="dao-setting-label">密码</div>
            <div class="dao-setting-content">
              <dao-input  type="text"
                          v-model="password"
                          icon-inside
                          :status = 'passwordError'
                          :message = 'passwordMsg'></dao-input>
            </div>
          </div>
        </div>
      </dao-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cvm_list',
    data() {
      return {
        msg: 'hello',
        page: 1,
        pagesize: 5,
        items: [],
        visible: false,
        password: '',
        passwordError: '',
        passwordMsg: '',
        data: {},
        config: {
          type: 'normal',
          title: '修改密码',
          size: 'sm',
          showHeader: true,
          showFooter: true,
          closeOnClickOutside: true,
          closeOnPressEscape: true
        },
        status: ''
      }
    },
    created() {
      var self = this
      this.$axios.get('http://10.100.54.146:8081/plan/getInstanceList')
        .then(function (res) {
          self.items = res.data.body
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      toEdit: function (id) {
        this.$router.push('/cvmcreate/' + id)
      },
      getStatus: function (item) {
//        let status = ''
//        switch (item) {
//          case 'ONLINE':
//            status = '已启动'
//            break
//          case 'OFFLINE':
//            status = '已关闭'
//            break
//          case 'INIT':
//            status = '初始化'
//            break
//          case 'DELETING':
//            status = '删除中'
//            break
//          case 'DELETED':
//            status = '已删除'
//            break
//          case 'SUBMIT_SUCCESS':
//            status = '审批成功'
//            break
//          case 'SYBMIT_FAILED':
//            status = '审批失败'
//            break
//          case 'DEPLOY_SUCCESS':
//            status = '部署成功'
//            break
//          case 'DEPLOY_FAILED':
//            status = '部署失败'
//            break
//        }
//        return status
        console.log(item)
        return item
      },
      lineStatus: function (item) {
        let status = ''
        if ((item.build_status || item.run_status) === 'OFFLINE') {
          status = true
        } else {
          status = false
        }
        return status
      },
      offStatus: function (item) {
        let status = ''
        if ((item.build_status || item.run_status) === 'ONLINE') {
          status = true
        } else {
          status = false
        }
        return status
      },
      deleteStatus: function (item) {
        let status = ''
        if ((item.build_status || item.run_status) === 'ONLINE') {
          status = false
        } else {
          status = true
        }
        return status
      },
      cvmOnline: function (data) {
        var self = this
        this.$axios.post('http://10.100.54.146:8081/plan/startInstances', {
          Region: data.Region,
          InstanceId: data.InstanceId,
          id: data.id
        })
          .then(function (res) {
            self.$noty.success('启动成功')
            self.items = res.data.body
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data)
              self.$noty.error(error.response.data.message)
            }
          })
      },
      cvmReline: function (data) {
        var self = this
        this.$axios.post('http://10.100.54.146:8081/plan/rebootInstances', {
          Region: data.Region,
          InstanceId: data.InstanceId,
          id: data.id
        })
          .then(function (res) {
            self.$noty.success('重启成功')
            self.items = res.data.body
          })
          .catch(function (error) {
            if (error.response) {
              self.$noty.error(error.response.data.message)
            }
          })
      },
      cvmOffline: function (data) {
        var self = this
        this.$axios.post('http://10.100.54.146:8081/plan/stopInstances', {
          Region: data.Region,
          InstanceId: data.InstanceId,
          id: data.id
        })
        .then(function (res) {
          self.$noty.success('停止成功')
          self.items = res.data.body
        })
        .catch(function (error) {
          if (error.response) {
            self.$noty.error(error.response.data.message)
          }
        })
      },
      cvmDeleted: function (data) {
        var self = this
        this.$axios.post('http://10.100.54.146:8081/plan/terminateInstances', {
          Region: data.Region,
          InstanceId: data.InstanceId,
          id: data.id
        })
          .then(function (res) {
            self.$noty.success('删除成功')
            self.items = res.data.body
          })
          .catch(function (error) {
            if (error.response) {
              self.$noty.error(error.response.data.message)
            }
          })
      },
      editPassword: function (data) {
        this.visible = true
        this.data = data
      },
      handleConfirm() {
        console.log(this.password)
        var self = this
        this.$axios.post('http://10.100.54.146:8081/plan/setResetInstancesPassword ', {
          Region: self.data.Region,
          InstanceId: self.data.InstanceId,
          id: self.data.id,
          Password: self.password
        })
          .then(function (res) {
            self.$noty.success('密码修改成功')
          })
          .catch(function (error) {
            if (error.response) {
              self.$noty.error(error.response.data.message)
            }
          })
      },
      prev: function () {
        this.page -= 1
      },
      next: function () {
        this.page += 1
      }
    }
  }
</script>

<style scoped>
  .dao-view-header {
    background-color: #ffffff;
    border-bottom: 1px solid #e4e7ed;
  }

  .header-top {
    margin: 0px 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .header-img{
    background-color: #e4e7ed;
    border-radius: 4px;
    width: 100px;
    height: 100px;
    margin: 15px 20px 20px 0px ;
  }
  .header-content {
    flex-grow: 1
  }

  .header-img svg{
    fill: #ccd1d9;
    width: 100px;
    height: 100px;
  }

  .content-top {
    height: 32px;
    margin: 1em 0em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content-bottom {
    min-height: 48px;
    color: #9ba3af;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    padding-top: 1em;
  }

  .header-name {
    font-size: 25px;
    line-height: 25px;
    color: #595f69;
    max-width: 70%;
  }

  .quota-item {
    display: inherit;
    width: 25em
  }

  .quota-item .dao-progress {
    width: 15em;
    margin-top: 6px;
  }
  .dao-table-page{
    padding: 20px 0;
  }
  .dao-table.slat td:first-child,th:first-child {
    margin-left: 20px;
  }
  .dao-table-page-span{
    padding-left: 10px;
    color: #9ba3af;
  }
</style>
