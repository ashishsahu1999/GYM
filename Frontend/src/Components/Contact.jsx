import React from 'react'

function Contact() {
  return (
    <div id='contact'>
        <h1>CONTACT US</h1>
        <form action="https://formsubmit.co/ashishappu43@gmail.com"  method="POST">
            <input type="text" placeholder='Full Name' required/>
            <input type="email" placeholder='Type Your E-Mail' required/>
            <textarea placeholder='Write Here' name="message" id=""></textarea>
            <input type="submit" value='send'/>
        </form>
    </div>
  )
}

export default Contact

