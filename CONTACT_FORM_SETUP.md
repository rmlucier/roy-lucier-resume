# Contact Form Setup Instructions

Your contact form is ready! To make it work, you need to get a free Web3Forms API key.

## Step 1: Get Your Web3Forms Access Key

1. Go to https://web3forms.com/
2. Click "Get Started Free"
3. Enter your email (rmlucier@gmail.com)
4. They'll send you an access key to your email
5. Copy the access key

## Step 2: Add the Access Key

1. Open `index.html`
2. Find line 1838 that says: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'`
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key
4. Save the file
5. Commit and push to deploy

Example:
```javascript
access_key: 'abc123-your-actual-key-here',
```

## Step 3: Update reCAPTCHA (Optional but Recommended)

The form currently uses Google's test reCAPTCHA key. For production:

1. Go to https://www.google.com/recaptcha/admin
2. Register your site (roy-lucier-resume.vercel.app)
3. Choose reCAPTCHA v2 "I'm not a robot"
4. Copy the site key
5. Replace the data-sitekey on line 1355 in index.html

## Features Included:

✅ Name, Email, Subject, and Message fields
✅ Google reCAPTCHA spam protection
✅ Form validation
✅ Success/error messages
✅ Loading state during submission
✅ Sends emails directly to rmlucier@gmail.com

## Testing:

Once deployed with your Web3Forms key, test the form by:
1. Filling out all fields
2. Completing the reCAPTCHA
3. Clicking "Send Message"
4. Check your email!

---

**Note:** Web3Forms is free for up to 250 submissions per month. Perfect for a personal resume site!
