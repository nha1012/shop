$( document ).ready(function() {
  $('.tm-product-card').on('click','.js-add-to-cart',function (params) {
    $.ajax({
      method:'POST',
      url: "./order",
      data: {productId : params.target.dataset.id},
      success: function (result) {
        console.log(result);
      },
      error: function(err){
       console.log(err);
      }
    })
  })
});
