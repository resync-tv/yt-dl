import test from "ava"
import YTDL, { adapters, yt_dl, ensureBinaries } from "../src"
import testVideos from "../test-videos.json"

let ytdlpAdapter: yt_dl.YTDLP
let binPath: string
test.before(async () => {
  binPath = await ensureBinaries(true)
  ytdlpAdapter = new adapters.ytdlp(binPath)
})

for (const [key, video] of Object.entries(testVideos)) {
  test(`fallback: ${key}`, async t => {
    const ytdl = new YTDL([adapters.ytdlcore, ytdlpAdapter.getInfo], "fallback")
    const info = await ytdl.getInfo(video)
    const [format] = info.formats

    t.truthy(format.url)
    t.truthy(format.quality)
  })

  test(`first-to-resolve: ${key}`, async t => {
    const ytdl = new YTDL([adapters.ytdlcore, ytdlpAdapter.getInfo], "first-to-resolve")
    const info = await ytdl.getInfo(video)
    const [format] = info.formats

    t.truthy(format.url)
    t.truthy(format.quality)
  })
}
