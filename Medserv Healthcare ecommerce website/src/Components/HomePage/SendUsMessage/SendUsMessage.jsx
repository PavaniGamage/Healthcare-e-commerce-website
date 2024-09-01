import React from 'react'
import './SendUsMessage.css'

const SendUsMessage = () => {
  return (
    <div className='send-us-message'>
        <div className='send-us-message-components'>
            <h1>Send Us Message</h1>
            <p>Connect directly with our dedicated pharmacist.</p>
            <form className='send-us-message-inputs'>
              <input type='text' name='name' placeholder='Your Name' required />
              <input type='email' name='email' placeholder='Your Email Address' required />
              <input type='text' name='subject' placeholder='Subject' required />
              <textarea name='message' placeholder='Type your message here...' required></textarea>
            </form>
            <button>Send Us</button>
        </div>
    </div>
  )
}

export default SendUsMessage