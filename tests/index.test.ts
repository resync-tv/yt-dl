import type YTDLP from "../src/yt-dlp"

import test from "ava"
import YTDL, { adapters } from "../src"
import testVideos from "../test-videos.json"

let ytdlpAdapter: YTDLP
test.before(() => {
  ytdlpAdapter = new adapters.ytdlp()
})

for (const [key, video] of Object.entries(testVideos)) {
  test(`fallback: ${key}`, async t => {
    const ytdl = new YTDL([adapters.ytdlcore, ytdlpAdapter.getInfo], "fallback")
    const info = await ytdl.getInfo(video)

    t.truthy(info.formats[0].url)
  })

  test(`first-to-resolve: ${key}`, async t => {
    const ytdl = new YTDL([adapters.ytdlcore, ytdlpAdapter.getInfo], "first-to-resolve")
    const info = await ytdl.getInfo(video)

    t.truthy(info.formats[0].url)
  })
}