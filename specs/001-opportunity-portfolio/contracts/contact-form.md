# Contact Form Contract

The static site submits a native HTML form to:

```text
https://formspree.io/f/{NEXT_PUBLIC_FORMSPREE_FORM_ID}
```

Fields: `name` (required), `email` (required email), `message` (required), and
`_gotcha` (hidden honeypot). The public endpoint ID is configuration, not a secret;
no API key is exposed. The form is omitted when its ID is blank. On success, present
an accessible status message and clear the fields. On network/provider errors, keep
the message visible and provide LinkedIn/GitHub alternatives. Submissions are
processed by Formspree and are subject to the account owner's provider settings. Native
browser validation handles incomplete inputs; Formspree presents its configured
confirmation and error responses. Provide a direct email and social path alongside it.
