
import React, { useState, useEffect } from 'react' 
import firebase from './firebase'

function useItems() {
    const [items, setItems] = useState([])

    useEffect(() => {
        const unsubscribe = firebase
        firebase
            .firestore()
            .collection('items')
            .onSnapshot((snapshot) => {
                const newItems = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

            setItems(newItems)
        })

        return () => unsubscribe()
    }, [])

    return items
}

const ItemsList = () => {   
    const items = useItems()

    return (
        <div>
            <ol>
                {items.map((item) =>
                <li key={item.id}>
                    <div>
                        {item.item}, {item.how_much}
                    </div>
                </li>
                )}
            </ol>
        </div>      
    )
}

export default ItemsList