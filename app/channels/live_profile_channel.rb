class LiveProfileChannel < ApplicationCable::Channel
  def subscribed
    stream_from "live_profile"
  end

  def unsubscribed
    stop_all_streams
  end
end
