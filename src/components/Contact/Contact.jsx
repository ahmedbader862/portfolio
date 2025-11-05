import React, { useRef, useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import Social from '../Social/Social';
import Input from '../Input/Input';

export default function Contact() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  // حط هنا القيم بتاعتك من EmailJS
  const EMAILJS_SERVICE_ID = 'service_xo5xhql';
  const EMAILJS_TEMPLATE_ID = 'template_srv017d';
  const EMAILJS_PUBLIC_KEY = 'bJZIwICg9t_a40xGz';

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !message) {
      setStatus({ ok: false, msg: 'Please fill all required fields.' });
      return;
    }
    if (!validateEmail(email)) {
      setStatus({ ok: false, msg: 'Please enter a valid email.' });
      return;
    }

    try {
      setSending(true);
      setStatus(null);

      const res = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS response', res);
      setStatus({ ok: true, msg: 'Message sent — thanks!' });
      formRef.current.reset();
    } catch (err) {
      console.error('Send error', err);
      setStatus({ ok: false, msg: 'Failed to send message. Try again later.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-section">
      {/* الجزء الشمال بتاع الفورم */}
      <div className="contact-left">
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>

          <Input 
            fieldNum={1}
            title="What's your name? *"
            name="name"
            placeholder="John Doe"
            type={'text'}
          />

          <Input 
            fieldNum={2}
            title="What's your email? *"
            name="email"
            placeholder="johndoe@example.com"
            type={'email'}
          />

          <Input 
            fieldNum={3}
            title="What would you like to talk about? *"
            name="message"
            placeholder="Hello, can you help me with..."
            rows={5}
            type={'text'}
          />

          <button className="send-btn" type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>

          {status && (
            <div className={`status ${status.ok ? 'ok' : 'err'}`}>{status.msg}</div>
          )}
        </form>
      </div>

      {/* الجزء اليمين */}
      <aside className="contact-right">

       <div className="arrow">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-left size-14 sm:size-16 max-md:-rotate-45 md:size-[4.5rem] lg:size-[5rem]"><path d="M17 7 7 17"></path><path d="M17 17H7V7"></path></svg>
       </div>


        <div className="talk">LET'S TALK</div>
        <p className="talk-desc">
          You're one step away from taking your brand or product to the next level.
          Share your project details below.
        </p>

        <div className="details">
          <div className="detail-row">

          <svg className="w-[37px] h-[37px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
          </svg>


            <span>Minya, Egypt</span>
          </div>
          

          <div className="detail-row">

           <svg className="w-[37px] h-[37px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
           </svg>

            <span>+20 1017906954</span>
          </div>

          <div className="detail-row">
          
          <svg className="w-[30px] h-[30px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
          </svg>
          

            
            <span>ahmed.mohamad.badr@gmail.com</span>
            
          </div>

          <div className="socials-placeholder">
          <Social/>
        </div>

        </div>

        {/* هنا هيتحط الكومبوننت بتاع السوشيال بتاعك */}
        
      </aside>
    </section>
  );
}
