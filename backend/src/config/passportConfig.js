import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'User not found' });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return done(null, user);
        else return done(null, false, { message: 'Incorrect password' });
  
      } catch (err) {
        done(err);
      }
    }
));

passport.serializeUser((user, done) => {
    console.log('Serialize user called');
    done(null, user._id);
});
  
passport.deserializeUser(async (_id, done) => {
    try {
      console.log('Deserialize user called');
      const user = await User.findById(_id);
      done(null, user);
    } catch (err) {
      done(err);
    }
});