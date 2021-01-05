import React, { useState, useEffect } from 'react'    //Step 4 import React from react //Step 12 insert useState and useEffect
import firebase from './firebase'        //import firebase             // (we have to hook it up into our firestore database and follow the react hooks API syntax)

function useItems() {                       //Step 14 create funtion    
    const [items, setItems] = useState([]) //it will start with an empty array becausse of ([])
    
    useEffect(() => {                      //Step 16 to fil this out we gonna have a useEffect (your second parameter needs to have an empty array, otherwise as soon 
        firebase                            //as we update our items we gonna rerun this effect over and over. We can't do that because we are creating a subscription to firestore inside of here)
                .firestore()
                .collection('items')        //collection in firebase
                .onSnapshot((snapshot) => {
                    const newItems = snapshot.docs.map((doc) => ({ //information from debugger, console?
                        id: doc.id,
                        ...doc.data()       //spreacd operator to merge this ID with all of this data
                    }))

                setItems(newItems)          //we can't see this work yet, but behind the scenes we are loading this data from items and we have assigned it to this array [items] -> Step 17
            })
    
    
    return items                            // Step 15 now we have abstracted this. This is going to be our API called firestore
}


const ItemsList = () => {               //Step 5 create a component just for UI //Step 16 and this component is now just referencing that data like a regular react hook
    const items = useItems()            //Step 13, then create the function useItems()
    
    return (
        <div>
            <h2>My Shopping List</h2>
            <ol>
                {items.map((item) =>    //Step 17 change things out with key, item and how_much. Now you can see changes in the app (input in firestore. We created a subscription here) Step 18 -> add-item.js
                    <li key={item.id}>  
                        <div>
                            {item.item}, {item.how_much}
                        </div>
                    </li>
                    )}
            </ol>
        </div>      
    }
}

export default ItemsList        //Step 6 export this to use it in the app.js







/*

        const unsubscribe = firebase
        
        return () => unsubscribe()
   
*/