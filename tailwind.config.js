module.exports = {
    theme: {
      maxWidth: {
       '1/4': '25%',
       '1/2': '50%',
       '3/4': '75%',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#FFFF00',
        'works': '#0000FF',
       })
    }
  }