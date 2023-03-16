class CommentsController < ApplicationController
    
    def index
        render json: Comment.all
    end

    def show 
        comment = Comment.find_by!(id: params[:id])
        render json: comment
    end

    def findpost
        post = Post.find_by!(id: params[:id])
        comments = post.comments
        render json: comments
    end

    def create
        comment = Comment.create!(content: params[:content], post_id: params[:post_id], user_id: params[:user_id])
        ActionCable.server.broadcast("live_comments", {
            post: comment
        })
        if comment.valid?
            render json: comment
        else
            render json: comment.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        comment = Comment.find_by!(id: params[:id])
        comment.destroy
    end
    
end
