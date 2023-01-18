

  import Navbar from '../Navbar/Navbar'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVER, 'template_gkh5kjd', form.current, 'HfIaV2JIzYfkqO2V2')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
        <div>
            <Navbar/>
<h2>Contact Form</h2>
            <form ref={form} onSubmit={sendEmail} className='card w-75 m-auto mt-5 bg-light'>
              <div className="card-body d-flex flex-column w-75 m-auto">
              <input name="user_email" className='m-2 rounded' type="email" placeholder="Email" />
              <input className='m-2 rounded p-2' type="text" placeholder="message" />
              <button className='m-2 btn btn-success rounded' type="submit" value="Send">Send</button></div>
            </form>

<form>

</form>
    </div>
</>
  );
};


