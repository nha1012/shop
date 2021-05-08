
function failsAddReview() {
    new Toast({
      message: 'Review thất bại!',
      type: 'warning',
    });
  }
function successAddReview() {
    new Toast({
        message: 'Review thành công!',
        type: 'success',
    });
}
function failsAddLoginReview() {
    new Toast({
      message: 'Vui lòng đăng nhập trước khi review!',
      type: 'warning',
      customButtons: [
        {
          text: 'Refresh the page',
          onClick: function() {
            window.location.reload();
          }
        },
        {
          text: 'Đăng nhập',
          onClick: function() {
            location.replace("/auth")
          }
        }
      ]
    });
  }
function addReview() {
    $(document).on('click','.send-btn-review__js',function (params) {
        const productId = $(this).data("id");
        const danhGia = $('.review__js').val();
        const soSao = +$('.so-sao__js').val();
        $.ajax({
          method:'POST',
          url: "/review-san-pham",
          data: { danhGia: danhGia, productId: productId, soSao: soSao },
          success: function (result) {
           successAddReview();
          },
          error: function(err){
          if (err.status === 403) {
                return failsAddLoginReview()
            }
        failsAddReview();
          }
        })
      })
}

$(function(){
    addReview();
});
  