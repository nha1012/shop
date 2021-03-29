let status = false;

function addCartItem(params, order){
  return `<li class="uk-visible-toggle" data-id="${order.orderId}">
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
                    <div class="uk-text-meta uk-text-xsmall">${order.qty} × ${params.giaKhuyenMai}</div>
                  </div>
                </div>
                <div>
                  <a
                    class="uk-icon-link uk-text-danger uk-invisible-hover remove-order__js"
                    uk-icon="icon: close; ratio: .75"
                    uk-tooltip="Remove"
                    data-id="${order.orderId}"
                  ></a>
                </div></div
            ></arttcle>
          </li>`
};
function addToCart() {
  $(document).on('click','.js-add-to-cart',function (params) {
    let soLuongDon = 1;
    const productId = $(this).data("id");
    const qty = +$('.tm-quantity-input').val();
    if (qty) {
      soLuongDon = qty
    }
    $.ajax({
      method:'POST',
      url: "/order",
      data: {productId: productId, qty: soLuongDon},
      success: function (result) {
        if (result.order) {
          $('.uk-list-divider').find(`.uk-visible-toggle[data-id="${result.order.orderId}"]`).remove()
          $('.uk-list-divider').append(addCartItem(result.product, result.order));
          getTongTienCart(result.order.tongTien);
          addBadge();
        }else{
          console.log(result);
        }
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
function addSum(tongTien){
  $('.sum-cart__js').text(tongTien);
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
function incrementOrder(orderQty, productId) {
  if (status) {
    return;
  }
  status = true;
  const qty = +$('.tm-quantity-input').val();
  const newQty = qty + orderQty;
  $.ajax({
    method:'PUT',
    url: "/order",
    data: {productId: productId, qty: newQty},
    success: function (result) {
      status = false;
      if (result.order) {
        $('.tm-quantity-input').val(newQty);
        if (qty<newQty) {
          addSum(result.order.tongTien);
        } else {
          addSum(result.order.tongTien);
        }
      }else{
        console.log(result);
      }
    },
    error: function(err){
     console.log(err);
    }
  })
}
function removeCartItem() {
  $(document).on('click', '.remove-order__js', function (params) {
    const orderId = $(this).data("id");
    $.ajax({
      method:'DELETE',
      url: "/order",
      data: {orderId: orderId},
      success: function (result) {
        deleteBadge();
        $('.cart-wrapper__js').find(`.cart-item__page[data-id="${result.order.orderId}"]`).remove();
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
