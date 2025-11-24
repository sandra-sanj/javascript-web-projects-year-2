const renderNav = (token) => {
  // display nav items based on existense of login token
  document.getElementById('profile-nav-link').style.display = token
    ? 'inline'
    : 'none';
  document.getElementById('login-nav-link').style.display = token
    ? 'none'
    : 'inline';
  document.getElementById('logout-nav-link').style.display = token
    ? 'inline'
    : 'none';

  // clear local storage when logging out
  document.getElementById('logout-nav-link').addEventListener('click', () => {
    localStorage.clear();
  });
};

export {renderNav};
