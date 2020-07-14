import React, { useState } from 'react';
import { signup } from '../../Utilities/firebaseFunctions';


const CommunityDashboard = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
             await signup(email, password);

        }
        catch (err){
            console.log(err)
        }
    }


    return (
        <div>
            CommunityDashboard
        <h3>Testing Sign up!</h3>

        <form onSubmit = {handleSubmit}>
            <input required id = 'email' placeholder = 'Email' value = {email} onChange = {(e) => {
                setEmail(e.currentTarget.value)
            }}/>

            <input required id = 'password' placeholder = 'Password' type = "password"  value = {password} onChange = {(e) => {
                setPassword(e.currentTarget.value)}} />
            
            <button>signUp</button>
        </form>

        </div>
    )
}

export default CommunityDashboard;
