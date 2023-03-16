class LiveCommentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "live_comments"
  end

  def unsubscribed
    stop_all_streams
  end
end
