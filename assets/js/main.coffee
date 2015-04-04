app.init = () ->
  
  #add ios/android class show show contextual links
  if navigator.userAgent.toLowerCase().indexOf('android') > -1
    document.getElementsByTagName('body')[0].className += ' android'
  else if navigator.userAgent.toLowerCase().indexOf('iphone') > -1
    document.getElementsByTagName('body')[0].className += ' iphone'

app.init();
