$( document ).ready(function() {
  $('.js-add-to-cart').click(function(params) {
    console.log(params.target.dataset.id);
  })
});
