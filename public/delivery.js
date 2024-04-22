function getFormValues() {
    const inputContainer = document.getElementById('order-details');
    const fieldList = inputContainer.querySelectorAll('input');
    const fieldArray = Array.from(fieldList);

    const payload = fieldArray.reduce(
        (obj, field) => {
            if (field.name === 'items') {
                if (field.checked) {
                    obj['order_value'] += parseInt(field.value);
                }
            } else {
                obj[field.name] = field.value;
            }
            return obj;
        },
        { order_value: 0 }
    );
    console.log(payload);
    return payload;
}

async function getFee() {
    const payload = getFormValues();
    const finalPayload = JSON.stringify(payload);
    const formInput = document.querySelector('form');

    if (formInput.checkValidity()) {
        try {
            const response = await fetch('/get-delivery-rate', {
                method: 'POST',
                body: finalPayload,
                headers: { 'content-type': 'application/json' }
            });.then((response)=>{
                let resp = response.json();
                return resp;
            })
            .catch((rejected)=>{
                console.log(rejected);
            });

            const deliveryFee = document.getElementById('fee');
            const clothingTotal = document.getElementById('price');
            const orderTotal = document.getElementById('total');

            clothingTotal.textContent = `$${(window.menuItems / 100).toFixed(2)}`;
            deliveryFee.textContent = `$${(responseData.data.fee / 100).toFixed(2)}`;
            orderTotal.textContent = `$${(
                (Number(window.menuItems) + responseData.data.fee) / 100).toFixed(2)}`;
            console.log('Successfully fetched delivery rate');
        } catch (error) {
            console.error('Error fetching delivery rate:', error);
        }
    } else {
        console.log('Please fill out the form');
    }
}

getFee(); // Call getFee function to initiate the process
