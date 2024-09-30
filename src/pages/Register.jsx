import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const rePasswordRef = useRef()

    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    function validata() {
        if (usernameRef.current.value.length < 3) {
            alert("usename is not valid");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'red'
            return false
        }

        if (!validateEmail(emailRef.current.value)) {
            alert('Email is not valid')
            emailRef.current.focus();
            emailRef.current.style.outlineColor = 'red'

        }

        if (passwordRef.current.value != rePasswordRef.current.value) {
            alert("parollar mos kelmadi ")
        }
        return true
    }
    function handelRegirter(event) {
        event.preventDefault();

        const isValid = validata();
        if (!isValid) {
            return;
        }

        const user = {
            "username": usernameRef.current.value,
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        }

        fetch("https://auth-rg69.onrender.com/api/auth/signup", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == "User registered successfully!") {
                    navigate('/login')
                }
                if (data.message == "Failed! Username is alread in use!" || data.message == "Failed! Email is alread in use!") {
                    alert(data.message)
                }
            })
            .catch(err=>{
                console.log(err);
                
            })
    }
    return (
        <div>
            <form className='w-1/4 mt-48 flex flex-col gap-4 mx-auto bg-green-300 p-6 rounded-xl shadow-green-800 shadow-2xl
            '>
                <input className='border rounded-md p-3 outline-green-500 text-green-900' ref={usernameRef} type="text" placeholder='Enter username ....' />
                <input className='border rounded-md p-3 outline-green-500 text-green-900' ref={emailRef} type="email" placeholder='Enter email ....' />
                <input className='border rounded-md p-3 outline-green-500 text-green-900' ref={passwordRef} type="password" placeholder='Enter password ....' />
                <input className='border rounded-md p-3 outline-green-500 text-green-900' ref={rePasswordRef} type="password" placeholder=' Re enter password ....' />
                <button className='border border-none  rounded-md p-3 bg-green-600 active:scale-95 text-white text-2xl font-medium ' onClick={handelRegirter}>REGISTER</button>
            </form>
        </div>
    )
}

export default Register