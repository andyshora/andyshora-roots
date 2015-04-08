app.init = () ->
  
  #add ios/android class show show contextual links
  if navigator.userAgent.toLowerCase().indexOf('android') > -1
    document.getElementsByTagName('body')[0].className += ' android'
  else if navigator.userAgent.toLowerCase().indexOf('iphone') > -1
    document.getElementsByTagName('body')[0].className += ' iphone'

  _gaq = _gaq or []
  _gaq.push [
    '_setAccount'
    'UA-17716290-10'
  ]
  _gaq.push [ '_trackPageview' ]
  do ->
    ga = document.createElement('script')
    ga.type = 'text/javascript'
    ga.async = true
    ga.src = (if 'https:' == document.location.protocol then 'https://ssl' else 'http://www') + '.google-analytics.com/ga.js'
    s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore ga, s
    return


app.init();
