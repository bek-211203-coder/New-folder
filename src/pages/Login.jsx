import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()


    function validata() {
        if (usernameRef.current.value.length < 3) {
            alert("usename is not valid");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'red'
            return false
        }
        return true
    }
    function handelLogin(event) {
        event.preventDefault();

        const isValid = validata();
        if (!isValid) {
            return;
        }

        const user = {
            "username": usernameRef.current.value,
            "password": passwordRef.current.value
        }

        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/home', { state: { user: data } });
                
            })
            .catch(err=>{
                console.log(err);
                
            })
    }
    return (
        <div>
            <form className='w-1/4 mt-52 flex flex-col gap-4 mx-auto bg-blue-200 p-6 rounded-xl shadow-2xl shadow-blue-800'>
                <input className='border rounded-md p-3 outline-blue-700 text-blue-900' ref={usernameRef} type="text" placeholder='Enter username ....' />
                <input className='border rounded-md p-3  outline-blue-700 text-blue-900' ref={passwordRef} type="password" placeholder='Enter password ....' />
                <button className='border border-none rounded-md p-3 bg-blue-500 active:scale-95 text-white text-2xl font-medium' onClick={handelLogin}>LOGIN</button>
            </form>
        </div>
    )
}

export default Login