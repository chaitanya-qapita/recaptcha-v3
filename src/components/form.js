import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  }
}

export default function Form() {
  const email = useFormInput('');
  const message = useFormInput('');
  
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState('');
  const [notification, setNotification] = useState('');

  const emailVal = email.value;
  const messageVal = message.value;


  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if the captcha was skipped or not
    if(!executeRecaptcha) {
      return;
    }

    // handle empty fields just in case
    if(!email.value) {
      setNotification('Please don\'t leave any of the fields empty');
    } else if (!message.value) {
      setNotification('Please don\'t leave any of the fields empty');
    }

    // This is the same as grecaptcha.execute on traditional html script tags
    const result = await executeRecaptcha('homepage');
    setToken(result); // grab the generated token by the reCaptcha

    // prepare the data for the server, specifically body-parser
    const data = JSON.stringify({ emailVal, messageVal, token });

    // post request to your server
    fetch('/submit', {
      method: 'POST',
      header: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: data, // this contains your data
    })
    .then(res => res.json())
    .then(data => {
      setNotification(data.msg); // dynamically set your notification state via the server
    });
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input type='text' name='email' id='email' {...email} required />
      <label htmlFor='message'>Message</label>
      <textarea name='message' id='message' rows='4' {...message} required></textarea>
      <input type='submit' value='Send' />
      {notification && <span>{notification}</span>}
    </form>
  )
}