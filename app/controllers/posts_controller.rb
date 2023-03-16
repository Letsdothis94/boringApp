class PostsController < ApplicationController

    def index
        render json: Post.all.order('created_at DESC')
    end

    def show 
        post = Post.find_by!(id: params[:id])
        render json: post
    end

    def create
        post = Post.create(post_params)
        ActionCable.server.broadcast("live_profile", {
            post: post
        })
        if post.valid?
        render json: post, status: :created
        else
            render json: post.errors.full_messages, status: :unprocessable_entity
        end
    end
    
    def destroy
        post = Post.find_by!(id: params[:id])
            ActionCable.server.broadcast("live_profile", {
            destroy: post
        })
        if post.destroy
            render json: post
        else
            render json: post.errors.full_messages
        end
    end

    def findposts
        user = User.find_by!(id: params[:id])
        posts = user.posts
        render json: posts     
    end

    def update
        post = Post.find_by!(id: params[:id])
        post.update(title: params[:title], caption: params[:caption])
            ActionCable.server.broadcast("live_profile", {
            update: post
        })
        render json: post
    end

    private
    
    def post_params
        params.permit(:title, :caption, :user_id, :featured_image)
    end

end
