<template>
    <section class="contact">
        <div class="contact__container">
            <h2 class="contact__title">Contact us</h2>
            <p class="contact__subtitle">Get in touch with us. We'd love to hear from you.</p>

            <form class="contact__form" action="#">
                <div class="contact__form-group">
                    <label class="contact__label" for="name">Name</label>
                    <input class="contact__input" type="text" id="name" placeholder="Enter your name" required>
                </div>

                <div class="contact__form-group">
                    <label class="contact__label" for="email">Email</label>
                    <input class="contact__input" type="email" id="email" placeholder="Enter your email" required>
                </div>

                <div class="contact__form-group">
                    <label class="contact__label" for="message">Message</label>
                    <textarea class="contact__textarea" id="message" cols="30" rows="6" placeholder="Enter your message"
                        required></textarea>
                </div>

                <button class="contact__button" type="submit">
                    Send Message
                </button>
            </form>
        </div>
    </section>
</template>

<style scoped>
.contact {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact__container {
    max-width: 600px;
    width: 100%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgb(0 0 0 / 25%);
    padding: 3rem;
}

.contact__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3748;
    text-align: center;
    margin-bottom: 0.5rem;
}

.contact__subtitle {
    font-size: 1.1rem;
    color: #718096;
    text-align: center;
    margin-bottom: 2.5rem;
}

.contact__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact__form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.contact__label {
    font-weight: 600;
    color: #4a5568;
    font-size: 0.95rem;
}

.contact__input,
.contact__textarea {
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #f7fafc;
}

.contact__input:focus,
.contact__textarea:focus {
    outline: none;
    border-color: black;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.contact__input::placeholder,
.contact__textarea::placeholder {
    color: #a0aec0;
}

.contact__textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
}

.contact__button {
    background: black;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.contact__button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.contact__button:active {
    transform: translateY(0);
}

/**********Media query **********/
@media (max-width: 768px) {
    .contact {
        padding: 2rem 1rem;
    }

    .contact__container {
        padding: 2rem;
    }

    .contact__title {
        font-size: 2rem;
    }
}
</style>