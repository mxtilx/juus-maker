type Unpacked<T> = T extends Promise<infer U> ? U : T

interface ReplyItem {
  key: string | number
  name: string
  avatar: string
  text: string
  img?: string
}

type JUUsComment = ReplyItem & { reply: ReplyItem[] }

interface JUUsData {
  id: number
  time: number
  img: string
  bg: string
  like: {
    flag: boolean
    num: string
    ellipsis: boolean
  }
  juus: ReplyItem
  comment: JUUsComment[]
}

interface TalkData {
  title: string
  time: number
  list: ReplyItem[]
}

type ShipLevel = '普通' | '稀有' | '精锐' | '超稀有' | '海上传奇' | '最高方案' | '决战方案' | ''

interface ShipData<T extends string | number = string> {
  avatar: string
  key: T
  name: string
  alias: string
  nickname: string
  qchar?: string
  data: {
    param0?: unknown
    param1: string
    param2: ShipLevel
    param3: string
    param4: string
  }
}

interface ShipDataList {
  [key: string]: ShipData
}
