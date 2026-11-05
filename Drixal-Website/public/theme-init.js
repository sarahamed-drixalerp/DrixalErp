(function () {
  try {
    var t = localStorage.getItem('drixal-theme')
    if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    if (t === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    }
  } catch (e) { /* ignore */ }
})()
