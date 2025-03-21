// import passport from "passport";
// import pkg from "passport-google-oauth20";
// // require(dotenv).config()
// const GoogleStrategy = pkg.Strategy;

// passport.use(new GoogleStrategy({
//     clientID:"72132349821-ioigokcijedi85rh39t9istoe1qks93p.apps.googleusercontent.com",
//     clientSecret:"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",
//     callbackURL:`http://localhost:5113/api/v1/auth/google/callback`,
// },
//     function(request,accessToken,refreshToken,profile,done){
//         return done(null,profile);
//     }
// ));

// export default passport;

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pool from '../../db/index.js';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: config.github_client_id,
//             clientSecret: config.github_client_secret,
//             callbackURL: config.github_callback_url,
//             scope: ['user:email']
//         },
//         async (accessToken, refreshToken, profile, done) => {
            
//             try {
                
//                 const email = profile.emails[0].value;
//                 const name = profile.displayName || profile.username;
//                 const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//                 let user = result.rows[0];

//                 if (!user) {
//                     const insertResult = await pool.query(
//                         'INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *',
//                         [name, email, '', 0] 
//                     );
//                     user = insertResult.rows[0];
//                 }
//                 return done(null, user);
//             } catch (err) {
//                 console.error('Error during GitHub login:', err.message);
//                 return done(err, null);
//             }
//         }
//     )
// );
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                return done(null, false, { message: 'User not found' });
            }
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }
            const { password: _, ...userWithoutPassword } = user;
            return done(null, userWithoutPassword);
        } catch (err) {
            console.error('Error during login:', err.message);
            return done(err);
        }
    })
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            const { password, ...userWithoutPassword } = result.rows[0];
            done(null, userWithoutPassword);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err, null);
    }
});

export default passport;
