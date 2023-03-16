class SessionsController < ApplicationController
  def signup
    user = User.new(email: params[:email], password: params[:password])

    # if user is saved
    if user.save
      # we encrypt user info using the pre-define methods in application controller
      token = encode_user_data({ id: user.id, email: user.email })

      # return to user
      render json: { token: token }
    else
      # render error message
      render json: { message: "invalid credentials" }
    end
  end

  def login
    user = User.find_by(email: params[:email])
    # you can use bcrypt to password authentication
    if user && user.password === params[:password]
      # we encrypt user info using the pre-define methods in application controller
      token = encode_user_data({ id: user.id, email: user.email })
      # return to user
      render json: { token: token }
    else
      render json: { message: "invalid credentials" }
    end
  end

end
