import {
  getIsUsernameAvailable,
  postNewUser,
  postLogInUser,
  getCurrentUserByToken,
  putUser,
  postUserProfilePicture,
} from './api.js';

const registerForm = document.getElementById('register');
if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // check if username is available
    const isUsernameAvailable = await getIsUsernameAvailable(
      formData.get('username')
    );
    if (!isUsernameAvailable.available) {
      alert('Username is not available.');
      return;
    }

    // check that passwords match
    if ((formData.get('password'), formData.get('password2'))) {
      alert('Passwords do not match.');
      return;
    }

    // save fields to object
    const userObject = {
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
    };

    const newUserResponse = await postNewUser(userObject);

    // redirect to main site if register successful
    if (newUserResponse) {
      location.href = './site.html';
    }
  });
}

const loginForm = document.getElementById('login');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const userObject = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const loginResponse = await postLogInUser(userObject);

    // save token and redirect to main site if login successful
    if (loginResponse) {
      // save token to localStorage
      localStorage.setItem('token', loginResponse.token);
      location.href = './site.html';
    } else {
      alert('Login failed. Incorrect username or password.');
    }
  });
}

const token = localStorage.getItem('token');

// set username information in html if logged in and elements exist
if (token) {
  getCurrentUserByToken(token).then((currentUserResponse) => {
    console.log(currentUserResponse);

    if (currentUserResponse) {
      // user profile username
      const profileUsernameElement = document.getElementById(
        'user-profile-username'
      );
      if (profileUsernameElement) {
        profileUsernameElement.innerText = currentUserResponse.username;
      }

      // user profile email
      const profileEmailElement = document.getElementById('user-profile-email');
      if (profileEmailElement) {
        profileEmailElement.innerText = currentUserResponse.email;
      }

      // NOT WORKING
      // user profile picture
      /*const profilePictureElement = document.getElementById(
        'user-profile-picture'
      );
      if (profilePictureElement) {
        profilePictureElement.src = currentUserResponse.avatar;
      }*/
    }
  });
}

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

// update user information

// update username
const updateUsernameForm = document.getElementById('update-username-form');
if (updateUsernameForm) {
  updateUsernameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    //console.log(formData);

    const isUsernameAvailable = await getIsUsernameAvailable(
      formData.get('username')
    );
    //console.log(isUsernameAvailable);

    if (isUsernameAvailable) {
      // save fields to object
      const userObject = {
        username: formData.get('username'),
      };

      const newUsernameResponse = await putUser(token, userObject);
      console.log(newUsernameResponse);

      if (newUsernameResponse) {
        updateUsernameForm.reset();
        alert('Username updated successfully!');
      }
    }
  });
}

const updatePasswordForm = document.getElementById('update-passsord-form');
if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    //console.log(formData);

    const passwordsMatch = (password, password2) => {
      return password === password2;
    };

    if (passwordsMatch(formData.get('password'), formData.get('password2'))) {
      // save fields to object
      const userObject = {
        password: formData.get('password'),
      };

      const newPasswordResponse = await putUser(token, userObject);
      console.log(newPasswordResponse);

      if (newPasswordResponse) {
        updatePasswordForm.reset();
        alert('Password updated successfully!');
      }
    }
  });
}

// update username
const updateEmailForm = document.getElementById('update-email-form');
if (updateEmailForm) {
  updateEmailForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    /*if (formData.get("email") === await getCurrentUserByToken(token).email) {
      return console.log("same email!");
    }*/

    // save fields to object
    const userObject = {
      email: formData.get('email'),
    };

    const newEmailResponse = await putUser(token, userObject);
    console.log(newEmailResponse);

    if (newEmailResponse) {
      updateEmailForm.reset();
      alert('Email updated successfully!');
    }
  });
}

// update profile picture
const updateAvatarForm = document.getElementById('update-avatar-form');
if (updateAvatarForm) {
  updateAvatarForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const avatarUploadResponse = await postUserProfilePicture(token, formData);
    console.log(avatarUploadResponse);

    if (avatarUploadResponse) {
      updateAvatarForm.reset();
      alert('Avatar updated successfully!');
    }
  });
}
