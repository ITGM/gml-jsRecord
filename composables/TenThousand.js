import { Random } from 'mockjs'
const TenThousand = []
let i = 0
while (i < 10000) {
  TenThousand.push({
    name: Random.cname(),
    idx: i
  })
  i++
}
export default () => {
  return TenThousand
}
