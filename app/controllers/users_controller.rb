class UsersController < ApplicationController
    
    def index
        render json: User.all
    end

    def show 
        user = User.find_by!(id: params[:id])
        render json: user
    end

    def create
        user = User.create!(email: params[:email], password: params[:password])
        render json: user
    end

    def destroy
        user = User.find_by!(id: params[:id])
        user.destroy
    end

    def update
        user = User.find_by!(id: params[:id])
        user.update(email: params[:email])
        render json: user
    end

end
