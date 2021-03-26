function addCartItem(params, orderId){
  return `<li class="uk-visible-toggle" data-id="${orderId}">
            <arttcle
              ><div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-4">
                  <div class="tm-ratio tm-ratio-4-3">
                    <a class="tm-media-box" href="product.html"
                      ><figure class="tm-media-box-wrap">
                        <img
                          src="${params.anhMinhHoa}"
                          alt='${params.tenSanPham}'
                        /></figure
                    ></a>
                  </div>
                </div>
                <div class="uk-width-expand">
                  <div class="uk-text-meta uk-text-xsmall">${params.danhMucSanPham.tenDanhMuc}</div>
                  <a class="uk-link-heading uk-text-small" href="${params.productId}"
                    >${params.tenSanPham}</a
                  >
                  <div
                    class="uk-margin-xsmall uk-grid-small uk-flex-middle"
                    uk-grid
                  >
                    <div class="uk-text-bolder uk-text-small">${params.giaKhuyenMai}</div>
                    <div class="uk-text-meta uk-text-xsmall">1 × ${params.giaKhuyenMai}</div>
                  </div>
                </div>
                <div>
                  <a
                    class="uk-icon-link uk-text-danger uk-invisible-hover remove-order__js"
                    uk-icon="icon: close; ratio: .75"
                    uk-tooltip="Remove"
                    data-id="${orderId}"
                  ></a>
                </div></div
            ></arttcle>
          </li>`
};
function addToCart() {
  $('.tm-product-card').on('click','.js-add-to-cart',function (params) {
    const productId = $(this).data("id");
    $.ajax({
      method:'POST',
      url: "./order",
      data: {productId: productId},
      success: function (result) {
        $('.uk-list-divider').append(addCartItem(result.product, result.order.generatedMaps[0].orderId));
        getTongTienCart(result.order.generatedMaps[0].tongTien);
        addBadge();
      },
      error: function(err){
       console.log(err);
      }
    })
  })
};
function getTongTienCart(tongTienCartItem){
  const tongTienHienTai = +$('.tong-cong__js').get()[0].innerHTML;
  $('.tong-cong__js').text(tongTienHienTai + tongTienCartItem);
};
function deleteTongTienCart(tongTienCartItem){
  const tongTienHienTai = +$('.tong-cong__js').get()[0].innerHTML;
  $('.tong-cong__js').text(tongTienHienTai - tongTienCartItem);
};
function addBadge() {
  const tongTienHienTai = +$('.cart-badge__js').get()[0].innerHTML;
  $('.cart-badge__js').text(tongTienHienTai + 1);
};
function deleteBadge() {
  const tongTienHienTai = +$('.cart-badge__js').get()[0].innerHTML;
  $('.cart-badge__js').text(tongTienHienTai - 1);
};
function removeCartItem() {
  $(document).on('click', '.remove-order__js', function (params) {
    const orderId = $(this).data("id");
    $.ajax({
      method:'DELETE',
      url: "./order",
      data: {orderId: orderId},
      success: function (result) {
        deleteBadge();
        $('.uk-list-divider').find(`.uk-visible-toggle[data-id="${result.order.orderId}"]`).remove();
        deleteTongTienCart(result.order.tongTien)
      },
      error: function(err){
       console.log(err);
      }
    })
  })
}
$(function(){
  addToCart();
  removeCartItem();
});
