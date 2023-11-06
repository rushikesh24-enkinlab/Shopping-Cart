document.addEventListener("DOMContentLoaded", function () {
    const productNameInput = document.getElementById("product-name");
    const productPriceInput = document.getElementById("product-price");
    const productQuantityInput = document.getElementById("product-quantity");
    const addToCartButton = document.getElementById("add-to-cart");
    const cartTable = document.getElementById("cart-table");
    const cartList = document.getElementById("cart-list");
    const totalCart = document.getElementById("cart-total");
    const purchaseButton = document.getElementById("purchase-button");

    addToCartButton.addEventListener("click", function () {
        const productName = productNameInput.value;
        const productPrice = parseFloat(productPriceInput.value);
        const productQuantity = parseInt(productQuantityInput.value);

        if (productName && !isNaN(productPrice) && !isNaN(productQuantity) && productQuantity > 0) {
            // Create a new row in the cart table
            const newRow = cartTable.insertRow(-1);

            // Add columns to the row
            const imgCell = newRow.insertCell(0);
            const nameCell = newRow.insertCell(1);
            const quantityCell = newRow.insertCell(2);
            const priceCell = newRow.insertCell(3);
            const actionCell = newRow.insertCell(4);

            // Set cell content
            imgCell.innerHTML = '<img src="images/cart.jpeg" alt="Product Image" width="50">';
            nameCell.textContent = productName;
            quantityCell.textContent = productQuantity;
            priceCell.textContent = 'Rs. ' + (productPrice * productQuantity).toFixed(2);
            actionCell.innerHTML = '<button class="remove">Remove</button>';

            // Calculate and update the total price
            updateTotalPrice();

            // Clear the input fields
            productNameInput.value = "";
            productPriceInput.value = "";
            productQuantityInput.value = "";
        }
    });

    // Event listener for the Remove button
    cartTable.addEventListener("click", function (e) {
        if (e.target && e.target.className == "remove") {
            cartTable.deleteRow(e.target.parentNode.parentNode.rowIndex);
            updateTotalPrice();
        }
    });

    function updateTotalPrice() {
        const rows = cartTable.rows;
        let total = 0;

        for (let i = 1; i < rows.length; i++) {
            const priceCell = rows[i].cells[3];
            total += parseFloat(priceCell.textContent.replace('Rs. ', ''));
        }

        totalCart.style.display = total === 0 ? "none" : "block";
        totalCart.style.backgroundColor = total === 0 ? "transparent" : "#0077FF";
        totalCart.style.color = total === 0 ? "#0077FF" : "white";

        totalCart.innerHTML = "Total: <span id='total-price'>Rs. " + total.toFixed(2) + "</span>";
    }

    // function updateTotalPrice() {
    //     const totalPrice = calculateTotalPrice();
    //     totalElement.textContent = `Total: Rs. ${totalPrice}`;
        
    //     if (totalPrice > 0) {
    //         totalButton.style.display = 'inline-block';
    //     } else {
    //         totalButton.style.display = 'none';
    //     }
    // }

    purchaseButton.addEventListener("click", function () {
        alert("Congratulations! 🎉 Thank you for your purchase!");
    });
});
