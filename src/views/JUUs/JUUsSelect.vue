<template>
  <Transition name="select">
    <div
      class="home-view"
      v-if="setting.ready && setting.juus.home"
    >
      <div class="home-wrapper">
        <div
          class="help"
          @click.stop="showHelp"
        >
          <img src="@/assets//images/help.webp" />
        </div>
        <div class="item-list">
          <div
            class="item"
            v-for="(item, index) in JUUsList"
            :key="`home-${index}`"
            @click.stop="showJUUs(item.id)"
            @contextmenu.prevent.stop="delJUUs(item.id)"
          >
            <Delete
              class="del"
              @click.stop="delJUUs(item.id)"
            />
            <div class="info">
              <InfoAvatar
                :width="65"
                :img="item.juus.avatar"
                :type="2"
              />
              <div class="name">
                {{ item.juus.name }}
              </div>
            </div>
            <div class="img">
              <img :src="item.img" />
            </div>
            <div class="text">
              {{ item.juus.text }}
            </div>
            <div class="like">
              <Heart
                class="like-img"
                :highlight="item.like.flag"
              />
              <div class="like-num">
                {{ getLikeText(item.like.num) }}
              </div>
            </div>
          </div>
          <div
            class="item add"
            @click.stop="addJUUs"
          >
            <Camera />
          </div>
        </div>
        <Background
          :img="currentBg"
          :type="1"
        />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { popupManager } from '@/assets/scripts/popup'
import Background from '@/components/JUUs/Background.vue'
import Heart from '@/components/Public/Heart.vue'
import { Delete, Camera } from '@/components/Public/Icon'
import InfoAvatar from '@/components/Public/InfoAvatar.vue'
import { data, getDefaultJUUs } from '@/store/juus'
import { setting } from '@/store/setting'
import { JUUsList, currentBg } from './JUUs'

watch(
  () => setting.ready,
  () => {
    if (setting.ready) {
      const key = 'juus-first-start'
      const firstStart = localStorage.getItem(key)
      if (!firstStart) {
        data.juus.push(getDefaultJUUs())
        showJUUs(data.juus[0].id)
        localStorage.setItem(key, Date.now().toString())
      }
    }
  },
  {
    once: true
  }
)

const getLikeText = (str: string) => {
  if (Number(str) > 999) return '999+'
  return str
}

const showHelp = () => {
  popupManager.open('confirm', {
    text: [
      '<div style="width: 100%;height: 270px;display: flex;flex-direction: column;align-items: center;justify-content: center;font-size: 40px;"><span>本来应该在这写使用说明的</span><span>但是好像没啥好说明的</span></div>'
    ]
  })
}

const showJUUs = (id: number) => {
  if (!setting.ready) return
  setting.juus.home = false
  setting.juus.id = id
  setting.juus.lastID = data.juus.findIndex((item) => item.id === id)
}

const addJUUs = () => {
  if (!setting.ready) return
  const newJuus = getDefaultJUUs()
  data.juus.push(newJuus)
  showJUUs(newJuus.id)
}

const delJUUs = (id: number) => {
  if (!setting.ready) return
  popupManager.open('confirm', {
    text: ['真的要删除吗'],
    fn: () => {
      const index = data.juus.findIndex((item) => item.id === id)
      if (index !== -1) {
        data.juus.splice(index, 1)
      }
    }
  })
}
</script>

<style lang="stylus" scoped>
.home-view
  position absolute
  z-index 5
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%

  .home-wrapper
    position relative
    z-index 2
    display flex
    overflow hidden
    width 1050px
    height 550px
    border-radius 5px
    box-shadow 3px 3px 5px rgba(0, 0, 0, 0.5), -3px -3px 5px rgba(0, 0, 0, 0.5)

    .help
      position absolute
      top 30px
      right 20px
      width 35px
      cursor pointer

      img
        width 100%

    .item-list
      overflow-y scroll
      margin 30px
      width 100%

      &::-webkit-scrollbar
        width 15px
        height 15px

      &::-webkit-scrollbar-track
        margin-top 45px
        border-radius 10px
        background-color rgba(200, 200, 200, 0.5)

      &::-webkit-scrollbar-thumb
        border-radius 10px
        background-color rgba(255, 255, 255, 0.9)

      &::-webkit-scrollbar-thumb:active
        background-color rgba(240, 240, 240, 0.9)

      .item
        position relative
        display flex
        align-items center
        margin-bottom 30px
        width 930px
        height 100px
        border-radius 5px
        background #eee
        cursor pointer
        transition box-shadow 0.25s
        user-select none

        &:last-child
          margin-bottom 0

        &:hover
          box-shadow 1px 1px 10px rgba(0, 0, 0, 0.4)

          .del
            opacity 1
            transform translateY(-50%) translateX(0)

        .del
          position absolute
          top 50%
          right -36px
          padding 5px
          width 20px
          height 20px
          border-radius 50%
          background rgba(240, 240, 240, 0.8)
          opacity 0
          cursor pointer
          transition all 0.25s
          transform translateY(-100%)
          user-select none

          &:hover
            opacity 1
            transform translateY(-50%)

        .info
          display flex
          flex-direction column
          align-items center
          margin auto 20px
          width 100px

          .avatar
            position relative
            width 65px
            height 65px
            cursor pointer

            div
              overflow hidden
              box-sizing border-box
              padding 1px
              height 100%
              border 1px solid #666
              border-radius 50%
              background #ddd

              img
                width 100%
                height 100%
                user-select none
                object-fit cover
                object-position center

          .name
            overflow hidden
            width 100%
            text-align center
            text-overflow ellipsis
            white-space nowrap

      .img
        display flex
        justify-content center
        align-items center
        margin auto 20px
        width 70px

        img
          width 100%

      .text
        display -webkit-box
        flex 1
        overflow hidden
        margin-right 10px
        max-height 50%
        word-break break-all
        font-size 20px
        -webkit-line-clamp 2
        -webkit-box-orient vertical

      .like
        display flex
        flex 0 0 120px
        align-items center

        .like-num
          margin-left 20px
          font-size 20px

.add
  justify-content center

  img
    width 45px
</style>
