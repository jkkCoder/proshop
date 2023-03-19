export const getReplyMessage = (message,setMessages) => {
    if(message === 'cart_items'){
        let items = JSON.parse(localStorage.getItem('cartItems'))
        console.log(items)
        let msg = '';
        let count = 1;
        if(!items){
            return {
                shouldSet: true,
                text: 'No items in cart'
            }
        }
        Array.from(items).forEach( item => {
            console.log(item)
            msg += `${count.toString()}) ${item.name}(${item.qty}) : ${item.price}\n`
            count ++ ;
        })

        return {
            shouldSet: true,
            text: msg
        };
    }

    if(message === 'remove_cart'){
        let items = JSON.parse(localStorage.getItem('cartItems'))
        if(!items){
            return {
                shouldSet: true,
                text: 'Cart already empty'
            }
        }
        localStorage.removeItem('cartItems');
        console.log("items removed from cart")
        return {
            shouldSet:true,
            text: 'items removed from cart'
        }
    }

    if(message === 'delete'){
        setMessages([])
        return {
            shouldSet: false
        }
    }

    return {
        shouldSet:true,
        text: message
    }
}