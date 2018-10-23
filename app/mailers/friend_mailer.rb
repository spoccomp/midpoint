class FriendMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.friend_mailer.meet_up_mailer.subject
  #
  def meet_up_mailer
    @greeting = "Hi"

    mail to: "to@example.org", subject: "meetup"
  end
end
