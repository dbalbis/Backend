/* AuthCheck */

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
}

function checkAuthNo(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/register');
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

export { checkAuth, checkAuthLogout, checkAuthNo };
