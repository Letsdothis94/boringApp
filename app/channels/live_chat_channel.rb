class LiveChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "live_chat"
  end

  def unsubscribed
    stop_all_streams
  end
end
