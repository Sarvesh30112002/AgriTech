import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from "primereact/inputtext";
import { AuthService } from '../service/AuthService';
import { setGlobalState } from '../state';


export const SignUp = () => {

    const [checked, setChecked] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');

    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getProductsSmall().then(data => setProducts(data));
    // }, []);

    const signUpUser = (e) => {
        e.preventDefault();
        const authService = new AuthService();
        authService.signUp({username, password, mobile, name}).then(userInfo => {
            console.log(userInfo);
            setGlobalState("userData", userInfo.cred);
            setGlobalState("isAuthenticated", true);
        });

    }

    return (
        <div className="flex align-items-center flex-column pt-6 px-3">
            <div className="surface-card p-6 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="images/blocks/logos/hyper.svg" alt="hyper" height="50" className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Sign Up to AgriTech</div>
                    <span className="text-600 font-medium line-height-3">Already have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="#/signin">Sign in here!</a>
                </div>

                <div>
                    <label htmlFor="name" className="block text-900 font-medium mb-2">Name</label>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="w-full mb-3" />
                    
                    <label htmlFor="mobile" className="block text-900 font-medium mb-2">Mobile Number</label>
                    <InputText value={mobile} onChange={(e) => setMobile(e.target.value)} id="mobile" type="text" className="w-full mb-3" />

                    <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" className="w-full mb-3" />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="w-full mb-3" />

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox inputId="rememberme1" binary className="mr-2" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="rememberme1">Remember me</label>
                        </div>
                    </div>

                    <Button onClick={signUpUser} label="Sign Up" icon="pi pi-user" className="w-full" />
                </div>
            </div>
        </div>
        
    );
}
