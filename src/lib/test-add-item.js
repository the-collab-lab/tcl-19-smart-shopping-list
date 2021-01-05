import React, { useState } from 'react'  //Step 9 import React from react //Step 19 insert useState
import firebase from './firebase'        //Step 18 import firebase   

const AddItemsToList = () => {             //Step 10 create a component for UI
    const [title, setTitle] = useState('') //Step 20 important emptyString, wire those up to these inputs
    const [number, setNumber] = useState('')    
    

    return (                                //Step 21 change our input with insert value, onChange and onSubmit. This is capturing these values into the variables (title, number)
        <form onSubmit={onSubmit}>          
        <h4>Add Items to List</h4>
            <div>
                <label>Name</label>
                <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}/>   
            </div>
            <div>
                <label>How much</label>
                <input type="number" value={number} onChange={e => setNumber(e.currentTarget.value)} />
            </div>
            <button>Add Item</button>
        </form>
    )
}

export default AddItemsToList           //Step 11 export this to import it to app.js - go to app.js
                                        


/*
    function onSubmit(e) {
        e.preventDefault()

        firebase
            .firestore()
            .collection('items')
            .add({
                item: title,
                how_much: parseInt(number)
            })
            .then(() => {
                setTitle('')
                setNumber('')
            })
    }
        */