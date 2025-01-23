const authorize = (roles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles; // Assume roles are included in the token payload.
    if (!roles.some(role => userRoles.includes(role))) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

module.exports = { authorize };
