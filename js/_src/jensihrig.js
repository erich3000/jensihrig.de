var num=30; 
var speed=50; 

var ssw=3000;
var ssh=screen.availHeight-30;
var sshw=Math.floor(ssw/2);
var sshh=Math.floor(ssh/2);

var ssx=new Array(num);
var ssy=new Array(num);
var ssz=new Array(num);

function ssup() {
  var el;
  for(var i=0;i<num;i++) {
    ssx[i]=ssx[i]+Math.floor((ssx[i]-sshw)/((21-ssz[i])/2));
    ssy[i]=ssy[i]+Math.floor((ssy[i]-sshh)/((21-ssz[i])/2));
    ssz[i]++;
    if(ssz[i]==20) {
      ssx[i]=Math.floor(Math.random()*sshw+(sshw/2));
      ssy[i]=Math.floor(Math.random()*sshh+(sshh/2));
      ssz[i]=0;
    }
    el=document.getElementById("ss"+i);
    el.style.left=ssx[i];
    el.style.top=ssy[i];
    el.style.fontSize=(10+ssz[i]*2);
  }

}

function starfield() {
  for(var i=0;i<num;i++) {
    ssx[i]=Math.floor(Math.random()*ssw);
    ssy[i]=Math.floor(Math.random()*ssh);
    ssz[i]=Math.floor(Math.random()*20);
    document.write('<div id="ss'+i+'" style="position:absolute; font-size:'+(10+ssz[i]*2)+'px; left:'+ssx[i]+'px; top:'+ssy[i]+'px">.</div>');

  }
  window.setInterval("ssup()",speed);

}

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