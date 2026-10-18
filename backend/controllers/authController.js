const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ success: false, message: 'Google ID token is required' });
    }

    // 1. Verify the Google ID Token from the mobile app
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // 2. Check if user already exists in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if they don't exist
      user = new User({
        name,
        email,
        googleId,
        authProvider: 'google',
        profilePicture: picture,
        isVerified: true,
      });
      await user.save();
    } else if (!user.googleId) {
      // Link Google ID if they originally signed up locally
      user.googleId = googleId;
      user.profilePicture = user.profilePicture || picture;
      await user.save();
    }

    // 3. Generate a secure session JWT
    const appToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    // 4. Send success response back to React Native
    res.status(200).json({
      success: true,
      message: 'Google login successful',
      token: appToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('Google Auth Controller Error:', error);
    res.status(500).json({ success: false, message: 'Google authentication failed on server' });
  }
};