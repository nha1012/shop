function successAdd() {
    new Toast({
      message: 'Đăng xuất thành công.',
      type: 'success',
      customButtons: []
    })
}

function apiLogOut() {
    $.ajax({
        method:'POST',
        url: "/log-out",
        success: function (result) {
            successAdd();
            location.replace("/auth")
          },
          error: function(err){
           console.log(err);
          }
      })
}
function logOut() {
    $(document).on('click','.log-out__js',function () {
        apiLogOut();
    })  
}
$(function(){
    logOut();
  });
  