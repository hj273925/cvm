<template>
  <div>
    <div class="dao-view-header">
      <div class="header-top">
        <div class="header-img">
          <span class="icon"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost:8080/management/serviceset-list#icon_container-small"></use></svg></span>
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
              <use xlink:href="#icon_stack-small"></use>
            </svg>
            <span>域名</span>
          </th>
          <th>
            <svg>
              <use xlink:href="#icon_location"></use>
            </svg>
            <span>IP</span>
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
            <div class="item-major">{{item.name}}</div>
          </td>
          <td class="host">
            <div class="item-major">{{item.host}}</div>
          </td>
          <td class="ip">
            <div class="item-major">{{item.IP}}</div>
          </td>
          <td class="status">
            <div class="item-major">{{getStatus(item)}}</div>
          </td>
          <td class="description">
            <div class="item-major">{{item.description}}</div>
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
                  <dao-dropdown-item @click="cdnOnline(item.id)" v-show = lineStatus(item)>启动</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true" v-show = lineStatus(item)></dao-dropdown-item>
                  <dao-dropdown-item @click="cdnOffline(item.id)" v-show = offStatus(item)>停止</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true" v-show = offStatus(item)></dao-dropdown-item>
                  <dao-dropdown-item @click="toEdit(item.id)">重置密码</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true" v-show = deleteStatus(item)></dao-dropdown-item>
                  <dao-dropdown-item @click="deleted(item.id)" v-show = deleteStatus(item)>删除</dao-dropdown-item>
                  <dao-dropdown-item :is-divided="true"></dao-dropdown-item>
                </dao-dropdown-menu>
              </dao-dropdown>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <empty-state v-show ="!items.length" title-data="暂无数据" id="empty">
      </empty-state>
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
        items: [{
          name: '大通',
          host: '198.08.67.86',
          build_status: 'ONLINE',
          IP: '198.08.67.86',
          description: 'good'
        }],
        status: ''
      }
    },
    created() {
      var self = this
      this.$axios.get(process.env.BASE_URL + '/query.json')
        .then(function (res) {
          self.items = res.data.cdns
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      toEdit: function (id) {
        this.$router.push('/cvmcreate/' + id)
      },
      deleted: function (id) {
        var self = this
        this.$axios.get(process.env.BASE_URL + '/remove.json?id=' + id)
          .then(function (res) {
            self.$noty.success('删除成功')
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data)
              self.$noty.error(error.response.data.message)
            }
          })
      },
      getStatus: function (item) {
        let status = ''
        switch (item.build_status || item.run_status) {
          case 'ONLINE':
            status = '已启动'
            break
          case 'OFFLINE':
            status = '已关闭'
            break
          case 'INIT':
            status = '初始化'
            break
          case 'DELETING':
            status = '删除中'
            break
          case 'DELETED':
            status = '已删除'
            break
          case 'SUBMIT_SUCCESS':
            status = '审批成功'
            break
          case 'SYBMIT_FAILED':
            status = '审批失败'
            break
          case 'DEPLOY_SUCCESS':
            status = '部署成功'
            break
          case 'DEPLOY_FAILED':
            status = '部署失败'
            break
        }
        return status
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
      cdnOnline: function (id) {
        var self = this
        this.$axios.get(process.env.BASE_URL + '/online.json?id=' + id)
          .then(function (res) {
            self.$noty.success('启动成功')
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data)
              self.$noty.error(error.response.data.message)
            }
          })
      },
      cdnOffline: function (id) {
        var self = this
        this.$axios.get(process.env.BASE_URL + '/offline.json?id=' + id)
        .then(function (res) {
          self.$noty.success('停止成功')
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data)
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
    margin: 20px 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .header-img svg {
    width: 100px;
    height: 100px;
    margin-right: 20px
  }

  .header-content {
    flex-grow: 1
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
