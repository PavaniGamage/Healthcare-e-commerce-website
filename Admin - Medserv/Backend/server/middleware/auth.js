function restrictTo(role) {
    return (req, res, next) => {
        if (role === null) {
            console.log('Access forbidden: role mismatch');
            return res.render('accessDenied');
        }

        if ((req.session.user && req.session.user.role) && role === 'both') {
            return next(); // Allow access
        }

        if (req.session.user && req.session.user.role === role) {
            return next(); // Allow access
        } else {
            console.log('Access forbidden: role mismatch');
            // res.status(403).json({ message: 'Access forbidden' });
            return res.render('accessDenied'); 
        }
    };
}

module.exports = { restrictTo }; 
