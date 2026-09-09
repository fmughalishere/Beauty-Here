import validator from 'validator';
import newsletterModel from '../models/newsletterModel.js';

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const existing = await newsletterModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ success: true, message: "You're already subscribed - thank you!" });
    }

    await newsletterModel.create({ email });

    res.status(201).json({ success: true, message: 'Subscribed! Watch your inbox for beauty tips and offers.' });

  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
};

export { subscribeNewsletter };
