require 'test_helper'

class MidpointsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get midpoints_new_url
    assert_response :success
  end

end
