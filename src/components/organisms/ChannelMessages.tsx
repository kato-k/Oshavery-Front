import { FC, useState, useEffect } from 'react'

import ChannelMessage from '../molecules/ChannelMessage'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface Response {
  id: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bot: string;
    state: string;
  };
  content: string;
  guild_id: string;
  channel_id: string;
};

const mkTestResponse = (authN: string): Response => {
  const ret: Response = {
    id: "test_id",
    timestamp: new Date().getTime().toString(),
    author: {
      id: "test_author_id",
      name: "NAME: " + authN,
      avatar: "test_author_name",
      bot: "test_author_bot",
      state: "test_author_state",
    },
    content: "test_content",
    guild_id: "test_guild_id",
    channel_id: "test_channnel_id",
  }
  const t = [
    "**HELLO**",
    "__UNKO__",
    "# TEST",
    ":+1: vote",
  ]
  ret.content = t[Math.floor(Math.random() * t.length)]
  return ret
}

const ChannelMessages: FC = () => {
  const [messages, setMessages] = useState<Response[]>([])

  useEffect(() => { setMessages(Array.from({ length: 20 }, (_, i) => (mkTestResponse(i.toString()))))}, [])

  const fetchMoreData = () => {
    // 参照を置いているだけ
    setMessages([...messages, ...Array.from({ length: 20 }, (_, i) => (mkTestResponse((i+messages.length).toString())))]);
  }

  return (
    <>
      <div>
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {messages.map((value, i) => (<div key={i}><ChannelMessage response={value}></ChannelMessage></div>))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default ChannelMessages
