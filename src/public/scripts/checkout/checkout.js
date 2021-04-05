let displayName, phoneNumber, email, address, message;
function getDataUser() {
  displayName = $('.input-display-name__js').val();
  phoneNumber = $('.input-phone-number__js').val();
  email = $('.input-email__js').val();
  address = $('.input-address__js').val();
  message = $('.input-message__js').val();
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
  return true;
}
function submit() {
  $(document).on('click', '.btn-check-out__js', function () {
    getDataUser();
    try {
      isValid();
      $.ajax({
        method:'POST',
        url: "/transaction/user-pay",
        data:{displayName: displayName, phoneNumber: phoneNumber, email: email, address: address, message: message},
        success: function (result) {
          console.log(result);
        },
        error: function(err){
         console.log(err);
        }
      })
    } catch (error) {

    }
  })
}
$(function(){
  submit();
});
