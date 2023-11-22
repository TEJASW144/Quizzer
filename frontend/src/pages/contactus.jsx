import styles from '../design/contactUs.module.css';
import React from 'react';

const Contactus = () =>{
    return(
    <div>
    <body>
        <header>
            Apollo's Oracle
        </header>

        <section class="contact-section">
            <h1>Contact Us</h1>
            <p>If you have any questions or concerns, feel free to reach out to us through the following channels:</p>

            <div class="contact-method">
                <h3>Email Support</h3>
                <p>Email: <a href="mailto:support@apolloracles.com">support@apolloracles.com</a></p>
            </div>

            <div class="contact-method">
                <h3>Calling Support</h3>
                <p>Phone: +1 (555) 123-4567</p>
            </div>

            <div class="contact-method">
                <h3>Chat Support</h3>
                <p>Chat with our support team during business hours at +918008080008.</p>
                
            </div>
        </section>

        <section class="faq-section">
            <h2 class="faqs">Frequently Asked Questions (FAQs)</h2>
            
            <dl>
                <dt>Q: Can we make a quiz without signing up?</dt>
                <dd>A: Our website provides plethora of opportunites to create quizzes but to access them you will have to sign-up.</dd>

                <dt>Q: Is creating quizzes on the website payable?</dt>
                <dd>A: Each and every feature of the website is completely free and is solely designed to foster the quizzing culture. </dd>

                <dt>Q: What all details are required to sign-up with the website?</dt>
                <dd>A: The website requires you to give a username,an email-id and frame a password.</dd>
            </dl>
        </section>

        <footer>
            <p>&copy; 2023 Apollo's Oracle. All rights reserved.</p>
        </footer>
</body>
        </div>
    )
};

export default Contactus;