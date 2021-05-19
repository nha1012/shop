let displayName, phoneNumber, username, address, password;
function successAdd() {
    new Toast({
      message: 'Đăng ký thành công.',
      type: 'success',
      customButtons: []
    })
}
function failsAdd(message) {
  new Toast({
    message: message,
    type: 'warning',
    customButtons: []
  })
}
function getDataUser() {
    displayName = $('.input-displayname__js').val();
    phoneNumber = $('.input-phonenumber__js').val();
    username = $('.input-username__js').val();
    address = $('.input-address__js').val();
    password = $('.input-password__js').val();
  }
function apiRegister(displayName, phoneNumber, username, address, password) {
    $.ajax({
        method:'POST',
        url: "/auth/register",
        data: {displayName:displayName, phoneNumber:phoneNumber, username:username, address:address, password:password},
        success: function (result) {
            successAdd();
            location.replace("/auth")
          },
          error: function(err){
            console.log(err);
            failsAdd(err)
          }
      })
}
function isValid(){
  if (!displayName) {
    throw new Error('Vui lòng nhập họ và tên')
  }
  if (!phoneNumber) {
    throw new Error('Vui lòng nhập số điện thoại')
  }
  if (!address) {
    throw new Error('Vui lòng nhập địa chỉ')
  }
  if (!password) {
    throw new Error('Vui lòng nhập mật khẩu')
  }
  if (!username) {
    throw new Error('Vui lòng nhập tài khoản')
  }
  return true;
}
function register() {
    $(document).on('click','.register__js',function () {
      try {
        getDataUser();
        isValid();
        apiRegister(displayName, phoneNumber, username, address, password);

      } catch (error) {
        failsAdd(error.responseJSON.message)
      }
    })  
}
$(function(){
  register();
  });
  