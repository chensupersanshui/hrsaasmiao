<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-change="changFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{disabled : fileComputed}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width: 180px;" :percentage="precent" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img width="100%" :src="imUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDLgy6CAwdAYjmSzLVRCnGbr14551vlRxF',
  SecretKey: 'ASZyEnHbkiW7Xj9hDlT8iCkEZns2HUTf'
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imUrl: '',
      currentFileUid: null,
      precent: 0,
      showPercent: false

    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },

    changFile(file, fileList) {
      // console.log(fileList)
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('geshicuowu')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('tupiantaida')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'chuci-160-1317181698', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
          onProgress: (params) => {
            this.precent = params.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'https://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
