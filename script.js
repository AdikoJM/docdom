document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout');

    let cart = [];

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            const productId = product.getAttribute('data-id');
            const productTitle = product.querySelector('h2').innerText;
            const productPrice = parseFloat(product.querySelector('p').innerText.split('$')[1]);

            addToCart(productId, productTitle, productPrice);
            updateCart();
        });
    });

    function addToCart(id, title, price) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                title: title,
                price: price,
                quantity: 1
            });
        }
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerText = `${item.title} x ${item.quantity} - $${item.price * item.quantity}`;
            cartItems.appendChild(listItem);

            total += item.price * item.quantity;
        });

        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    }

    checkoutButton.addEventListener('click', () => {
        alert('Paiement effectué! Montant total: $' + totalElement.innerText.split('$')[1]);
        cart = [];
        updateCart();
    });
});