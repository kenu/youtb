const { google } = require('googleapis')

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY, // 생성한 API 키를 여기에 입력합니다.
})

describe('test', () => {
  it('test', () => {
    const thumbnail = 'https://i.ytimg.com/vi/hHAqR-qKZjo/default.jpg'
    const videoId = 'hHAqR-qKZjo'
    expect(getVideoId(thumbnail)).toBe(videoId)
  })
})
function getVideoId(thumbnail) {
  const regex = /^https:\/\/i\.ytimg\.com\/vi\/([^/]+)\/.*$/
  const match = thumbnail.match(regex)
  if (match) {
    return match[1]
  }
  return null
}

describe('get channel info by id', () => {
  it('test', async () => {
    const channelId = 'UCdNSo3yB5-FRTFGbUNKNnwQ'
    const channelInfo = await getChannelInfo(channelId)
    expect(channelInfo.title).toBe('프로그래머 김플 스튜디오')
    expect(channelInfo.thumbnail).toBe(
      'https://yt3.ggpht.com/SrCeLz3yIf5kVvXOZz8VzenrpyYOIolN9xAdyQI9X6G-_JhiGKqR0nRQ_OcaK5c5cYkyeA0OFQ=s800-c-k-c0x00ffffff-no-rj'
    )
  })
})

async function getChannelInfo(channelId) {
  try {
    const response = await youtube.channels.list({
      id: channelId,
      part: 'snippet,contentDetails', // 필요한 정보를 지정합니다.
    })
    const items = response.data.items[0]
    const data = {
      title: items.snippet.title,
      customUrl: items.snippet.customUrl,
      thumbnail: items.snippet.thumbnails.medium.url,
      channelId: items.id,
    }
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
