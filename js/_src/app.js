

function mailto() {
  var e = '';
  ML="m:sa.eit@ldkohpjrng";
  MI="03697<1595;7@<><278?5A26=@6B4:5";

  for(j=0;j<MI.length;j++){
    e+=ML.charAt(MI.charCodeAt(j)-48);
  }
  return e;
}

function go() {
	document.location.href=mailto();
	return false;
}