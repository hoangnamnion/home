document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout");
    const paymentSection = document.getElementById("payment");
    const qrCodeImage = document.getElementById("qr-code");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    const bankAccount = "2005838699";
    const bankName = "TeckComBank";
    const accountHolder = "Cao Văn Nam";

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartDisplay() {
        if (!cartList || !totalPriceElement) return;
        cartList.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ${parseInt(item.price).toLocaleString()} VNĐ 
                <button onclick="removeFromCart(${index})">Xóa</button>`;
            cartList.appendChild(li);
            totalPrice += parseInt(item.price);
        });

        totalPriceElement.textContent = totalPrice.toLocaleString() + " VNĐ";
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartDisplay();
    }

    function generateQRCode(amount) {
        const qrApiUrl = `https://img.vietqr.io/image/970407-${bankAccount}-compact2.png?amount=${amount}&addInfo=Thanh%20toan%20don%20hang`;
        qrCodeImage.src = qrApiUrl;
        paymentSection.style.display = "block";
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            if (!product) return;

            const name = product.getAttribute("data-name") || "Sản phẩm không xác định";
            const price = product.getAttribute("data-price") || "0";

            cart.push({ name, price });
            saveCart();
            updateCartDisplay();
            alert("Đã thêm vào giỏ hàng!");
        });
    });

    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            localStorage.removeItem("cart");
            cart = [];
            updateCartDisplay();
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            const totalAmount = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
            if (totalAmount > 0) {
                generateQRCode(totalAmount);
            } else {
                alert("Giỏ hàng trống!");
            }
        });
    }

    updateCartDisplay();
    window.removeFromCart = removeFromCart;
});