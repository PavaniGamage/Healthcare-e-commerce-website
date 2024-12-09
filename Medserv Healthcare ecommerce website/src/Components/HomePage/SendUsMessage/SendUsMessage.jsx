// import React, { useState } from 'react'
// import './SendUsMessage.css'

// const SendUsMessage = () => {
//   return (
//     <div className='send-us-message'>
//         <div className='send-us-message-components'>
//             <h1>Send Us Message</h1>
//             <p>Connect directly with our dedicated pharmacist.</p>
//             <form className='send-us-message-inputs'>
//               <input type='text' name='name' placeholder='Your Name' required />
//               <input type='email' name='email' placeholder='Your Email Address' required />
//               <input type='text' name='subject' placeholder='Subject' required />
//               <textarea name='message' placeholder='Type your message here...' required></textarea>
//             </form>
//             <button>Send Us</button>
//         </div>
//     </div>
//   )
// }

// export default SendUsMessage

import React, { useState } from 'react'
import './SendUsMessage.css'

const SendUsMessage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Send the data to the backend 
    try {
      const response = await fetch('http://localhost:4000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      })

      const result = await response.json()
      if (response.ok) {
        alert('Message sent successfully!')
        // Clear the form after sending
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setError(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setError('There was an error sending the message')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='send-us-message'>
      <div className='send-us-message-components'>
        <h1>Send Us Message</h1>
        <p>Connect directly with our dedicated pharmacist.</p>
        <form className='send-us-message-inputs' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='subject'
            placeholder='Subject'
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name='message'
            placeholder='Type your message here...'
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Us'}
          </button>
        </form>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  )
}

export default SendUsMessage
