var activeFrame;
var slice = [].slice;

window.addEventListener('popstate', function(e){
   var hash = shower.getSlideHash(shower.getCurrentSlideNumber()).substr(1), demo;

   if (hash.indexOf('demo-') === 0) {
      demo = hash.substr('demo-'.length);
      demos[demo](document.getElementById(hash).firstElementChild);
   }

}, false);

var demos = {
   geolocation: function(ctr) {
      navigator.geolocation.getCurrentPosition(function(pos){
         ctr.innerHTML = '';
         new ymaps.Map(ctr, {
            center: [pos.coords.latitude, pos.coords.longitude],
            zoom: 17
         });
      })
   },
   battery: function(ctr) {

      function setCharging(mgr) {
         var battery = ctr.getElementsByClassName('battery')[0];
         if (mgr.charging) {
            battery.classList.add('charging')
         } else {
            battery.classList.remove('charging');
         }
      }

      navigator.getBattery().then(function(mgr){

         ctr.getElementsByClassName('progress')[0].style.width = (mgr.level * 100) + '%';
         setCharging(mgr);

         mgr.addEventListener('chargingchange', function(e) {
            setCharging(e.target);
         });

      });

   }
};