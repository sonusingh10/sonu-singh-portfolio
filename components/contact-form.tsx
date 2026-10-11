const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

export function ContactForm() {
  if (!formId) return <div className="form-note"><span className="form-note-icon" aria-hidden="true">✳</span><div><strong>Prefer a direct note?</strong><p>The message form will be available after Formspree is connected. For now, email me directly.</p></div></div>;

  return <form className="contact-form" action={`https://formspree.io/f/${formId}`} method="POST">
    <label>Name<input name="name" autoComplete="name" required maxLength={120} /></label>
    <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    <label>What would you like to talk about?<textarea name="message" rows={4} required maxLength={5000} /></label>
    <input name="_gotcha" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="button button-dark" type="submit" data-interaction>Send a message<span aria-hidden="true">↗</span></button>
    <p className="form-status">Formspree will confirm delivery in your browser.</p>
  </form>;
}
