/* AuthCheck */

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
}

/* NO for LOGOUT */
function checkAuthLogout(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = { checkAuth, checkAuthLogout };
