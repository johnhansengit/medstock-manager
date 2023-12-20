require('dotenv').config();

// Middleware for routes that require an approved, logged-in user
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        const approvedUsers = process.env.APPROVED_USERS.split(',');

        if (approvedUsers.includes(req.user.email)) {
            return next();
        } else {
          return res.redirect('/access-denied');
        }
    } else {
        // Redirect to login if the user is not logged in
        res.redirect('/auth/google');
    }
};
