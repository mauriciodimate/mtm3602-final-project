const $image = document.getElementById('image') 

fetch('https://api.nasa.gov/planetary/apod?api_key=6hiW74QvygxpoAu9FH5tzoxxZIR1nN8ese3ikuYe&date=2020-12-07')
.then(response => {
    return response.json()
})
.then(data=> {
  console.log(data.copyright)
    console.log(data.date)
    console.log(data.explanation)
    console.log(data.url)
    $image.src = data.url
})
.catch(error =>{
console.log(error.name, error.message)
})
/**date */
var DateTime = luxon.DateTime;
var now = DateTime.local();
let displaydate = false;
let format24 = true;


 /*crear formulario*/
 const $form2 = document.getElementById('form2')
const $yes = document.getElementById('yes') 
const $yes1 = document.getElementById('yes1')
const $dates = document.getElementById('dates')
const $no = document.getElementById('no')
const $no1 = document.getElementById('no1')
/*time*/
var timer = new easytimer.Timer();

timer.start({precision: 'seconds', startValues: {hours: now.hour, minutes: now.minute}});
console.log (timer.getTimeValues().toString())
console.log(now.minutes)

let $timebox = document.getElementById('container-time')
$timebox.innerHTML= timer.getTimeValues().toString()
const $button = document.getElementById('open') /*declare the button*/

/*local storage data*/
const data = JSON.parse(localStorage.getItem('data'))
if(data){
    displaydate = data.displaydate;
    format24 = data.format24;
    if(displaydate == true){
        $yes.checked = true
    }else{
        $no.checked = true
    }
    if(format24 == true){
        $yes1.checked = true
    }else{
        $no1.checked = true
    }
}

timer.addEventListener('secondsUpdated', function (e) {
    $timebox.innerHTML= timer.getTimeValues().toString()
    console.log(displaydate)


    if(displaydate){
        

                        if(format24){
                            $timebox.innerHTML= timer.getTimeValues().toString()
                            $timebox.innerHTML += now.toFormat('DDDD')
                            console.log('claro')
                            
                        }else{
                            $timebox.innerHTML = now.toFormat('hh:mm a')
                            $timebox.innerHTML += now.toFormat('DDDD')
                           
                                console.log('de pronto')
                                }
            }else{
                        if(format24){
                            $timebox.innerHTML= timer.getTimeValues().toString()
                        
                            
                        }else{
                            $timebox.innerHTML = now.toFormat('hh:mm a')}
                      

    }
    
    if(now.hour < 12){
      $timebox.innerHTML += 
      '-Good morning'
    }
    else if(now.hour>12 && now.hour<18){
        $timebox.innerHTML += '-Good afternoon'
    }
    /*para todo lo demas*/
    else{
         $timebox.innerHTML +=   '-Good Night'
    }

});
/*to put the elements behind the button*/
let status = true;



$button.addEventListener('click', function(){

const $details =document.getElementById('details-container')
if(status){
console.log('inside')
$details.style.display= 'block'
status=false;


}else{
 status=true;
 $details.style.display= 'none'   
}




const $week = document.getElementById('week')
 $week.innerHTML=  'Day of the week : ' + '<p class="dayoftheweek">'+ now.toFormat('cccc') + '</p>'

const $daymonth = document.getElementById('day-month')
$daymonth.innerHTML=  'Day of the month : ' + '<p class="dayofthemonth">'+ now.toFormat('dd') + '</p>'

const $weekofyear = document.getElementById('week-of-year')
$weekofyear.innerHTML=  'Week of the year : ' + '<p class="weekoftheyear">'+ now.toFormat('W') + '</p>'

const $dayyear= document.getElementById('day-year')
$dayyear.innerHTML= 'Day of the year : ' + '<p class="dayoftheyear">'+ now.toFormat('o') + '</p>'

 //// event.preventDefault()

})


/*slide out¨*/
 var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
      });

      // Toggle button
      document.querySelector('.toggle-button').addEventListener('click', function() {
        slideout.toggle();
      });

 
$form2.addEventListener('submit', function(event){
event.preventDefault()
 slideout.toggle();


console.log($yes.checked)
if($yes.checked){
    /*console.log('Yes')*/
displaydate = true

}else{
    displaydate = false
}

if($yes1.checked){
    format24 = true
    console.log('si'+ $yes1.checked)
}else{
    format24 = false
    console.log('no')
}

const string = JSON.stringify({ displaydate: displaydate, format24: format24 })


localStorage.setItem('data', string)



});

