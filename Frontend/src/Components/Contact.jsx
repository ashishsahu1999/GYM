import React from 'react';

function Contact() {
  return (
    <>
      {/* Internal CSS */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
          font-family: 'Lato', sans-serif;
        }

        #contact {
          max-width: 500px;
          margin: 150px auto 50px auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        #contact h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        #contact form {
          display: flex;
          flex-direction: column;
        }

        #contact input,
        #contact textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        #contact input:focus,
        #contact textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
        }

        #contact input[type="submit"] {
          background: linear-gradient(90deg, #FF1414 20%, #f70000);
          color: #fff;
          cursor: pointer;
          transition: background 0.3s ease;
          border: none;
        }

        #contact input[type="submit"]:hover {
          background: linear-gradient(90deg, #f70000 20%, #FF1414);
        }
      `}</style>

      {/* Contact Form */}
      <div id="contact">
        <h1>CONTACT US</h1>
        <form action="https://formsubmit.co/ashishappu43@gmail.com" method="POST">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Type Your E-Mail" required />
          <textarea placeholder="Write Here" name="message" rows="5" required></textarea>
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}

export default Contact;
