import React, { useState, useContext } from 'react'
import { useHistory} from 'react-router-dom'
import { signIn } from '../../Utilities/firebaseFunctions'

const SignInModal = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signIn(email, password)
            // history.push("/loggedin/tweet")

        }
        catch (err){
            console.log(err)
        }
    }


    return (
        <div>
           <form onSubmit = {handleSubmit}>

            <input id = 'email' placeholder = 'Email' value = {email} onChange = {(e) => {
                setEmail(e.currentTarget.value)
            }}/>
                <br/>
            <input id = 'password' placeholder = 'Password' type = "password"  value = {password} onChange = {(e) => {
                setPassword(e.currentTarget.value)}} autoComplete = "on" />
                <br/>
            <button>Login</button>
        </form>
        </div>
    )
}

export default SignInModal;
