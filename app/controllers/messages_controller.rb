class MessagesController < ApplicationController

    def index 
        render json: Message.all
    end

    def create
        message = Message.create(content: params[:content], user_id: params[:user_id], username: params[:username])
        ActionCable.server.broadcast("live_chat", {
            post: message
        })
        if message.valid?
            render json: message
        else
            render json: message.errors.full_messages, status: :unprocessable_entity
        end
    end    

    def destroy
        message = Message.find_by!(id: params[:id])
        message.destroy
    end

end
