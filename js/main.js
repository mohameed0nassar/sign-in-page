


var signIn = document.querySelector('#signIn');
var signInBtn = document.querySelector('#signIn .btn');
var signUpSection = document.querySelector('#signIn a');
var signUp = document.querySelector('#signUp');
var signUpBtn = document.querySelector('#signUp .btn');
var signInSection = document.querySelector('#signUp a');
var home = document.querySelector('#home');
var logOutBtn = document.querySelector('nav .btn');
var navBar = document.querySelector('nav')
var routeLogo = document.querySelector('.col-11')
var userNameSignUpInp = document.querySelector('#userNameSignUpInp')
var emailSignUpInp = document.querySelector('#emailSignUpInp')
var passSignUpInp = document.querySelector('#passSignUpInp')
var emailSignInInp = document.querySelector('#emailSignInInp')
var passSignInInp = document.querySelector('#passSignInInp')
var hintSignUpInp = document.querySelector('#hintSignUpInp')
var getPass = document.querySelector('.cursor-pointer')
var errorName = document.querySelector('.user-name')
var emailUp = document.querySelector('.emailUp')
var passUp = document.querySelector('.passUp')
//local storage
var box;
if (localStorage.getItem("users") != null) {
    box = JSON.parse(localStorage.getItem("users"));
  } else {
    var box = [];
}
function setDis(nameKey = "", data = []) {
    localStorage.setItem(nameKey, JSON.stringify(data).toLowerCase());
  }
function changePage(x,y,z) {
    x.classList.remove('d-none')
    y.classList.add('d-none')
    z.classList.add('d-none')
}
function clearForm() {
        userNameSignUpInp.value= ''
        emailSignUpInp.value= ''
        passSignUpInp.value= ''
        hintSignUpInp.value=''
        emailSignInInp.value=''
        passSignInInp.value=''
  }
//SPA
signInSection.addEventListener('click', function () {
    changePage(signIn, signUp, home)
    clearForm()
    clearValid()
//    errorName.innerHTML = ''
   errorName.innerHTML =''
   emailUp.innerHTML =''
   passUp.innerHTML =''
})
signUpSection.addEventListener('click', function () {
    changePage(signUp,signIn,home)
    clearForm()
    clearValid()
    

})

logOutBtn.addEventListener('click', function () {
    changePage(signIn,home,signUp)
    routeLogo.classList.remove('d-none')
    clearForm()
    clearValid()
})
signUpBtn.addEventListener('click', function () {
    clearValid()
    var user = {
        name: userNameSignUpInp.value,
        email: emailSignUpInp.value,
        pass: passSignUpInp.value,
        instructor: hintSignUpInp.value
    }
    console.log(box);
    setDis('users', box)
    for (var i = 0; i < box.length; i++) {
        if (box[i].email == user.email.toLowerCase()) {
          var  v=true
        }
        
        
        
    }
    if (v == true) {
        swal({
            title:'Sign Up Error',
            icon: 'error',
            closeOnClickOutside: false,
            closeOnEsc: false,
            dangerMode:true,
            text:'this email has used already '
      })
    } else {
        
        if ( userNameSignUpInpValid() && emailSignUpInpValid() && passSignUpInpValid() && hintSignUpInpValid() ){
            box.push(user)
            for (let i = 0; i < box.length; i++) {
                box[i].instructor = box[i].instructor.toLowerCase()
                
            }
          setDis("users", box);
            clearForm()
            clearValid()
            swal({
                icon: "success",
                title: "Thanks" ,
                text: "Signed Up",
                timer: 1300,
                buttons:false,
            })
    
            console.log("true");
        } else {
            console.log("false");
            swal({
                title:'Sign Up Error',
                icon: 'error',
                closeOnClickOutside: false,
                closeOnEsc: false,
                dangerMode:true,
                text:'Please follow the rules'
          })
        }
    }

})
signInBtn.addEventListener('click',function () {
    for (var i = 0; i < box.length; i++) {
        if (box[i].email == emailSignInInp.value.toLowerCase()) {
            if (box[i].pass == passSignInInp.value.toLowerCase()) {
                var n=box[i].name
                var  v=true
            }
        } 
        
    }
    if (v == true) {
        changePage(home,routeLogo,signIn)
        displayUserName(n)
        clearForm()
    } else {

        swal({
            title:'Sign In Error',
            icon: 'error',
            closeOnClickOutside: false,
            closeOnEsc: false,
            dangerMode: true,
            text:`email or password is wrong please try again or Sign Up if you don't have account`      })
    }

})
function displayUserName(n) {
    document.querySelector('#userNameOutP').innerHTML = n
}
function clearValid() {
    userNameSignUpInp.classList.remove('is-valid','is-invalid');
    emailSignUpInp.classList.remove('is-valid','is-invalid');
    passSignUpInp.classList.remove('is-valid','is-invalid');
    hintSignUpInp.classList.remove('is-valid', 'is-invalid');
    
    

}
function emailSignUpInpValid(){
    var regX = /^[\w]{1,50}\@[a-zA-Z]{2,5}\.[a-zA-Z]{1,6}$/;
    if (regX.test(emailSignUpInp.value)) {
       

        
       return true;
  } else {
       return false;
        
  }

  
}
emailSignUpInp.addEventListener('change', function () {
    if ( emailSignUpInpValid()) {
        document.querySelector('.emailUp').innerHTML =''
        emailSignUpInp.classList.remove('is-invalid')
        emailSignUpInp.classList.add('is-valid')
    } else {
        document.querySelector('.emailUp').innerHTML ='Please enter email@expample.com'
      emailSignUpInp.classList.add('is-invalid')
        
    }
   

})
function hintSignUpInpValid(){
    var regX = /^[\w\s]{1,25}$/;
    if (regX.test(hintSignUpInp.value)) {
       

        
       return true;
  } else {
       return false;
        
        
  }

  
}
hintSignUpInp.addEventListener('change',function () {
    if ( hintSignUpInpValid()) {
        hintSignUpInp.classList.remove('is-invalid')
        hintSignUpInp.classList.add('is-valid')
    } else {
      hintSignUpInp.classList.add('is-invalid')
        
    }
})
getPass.addEventListener('click', function () {
    
    swal({
        title: 'oops!',
        content: 'input',
        text:"enter your instructor's name",
        button: {
            text: 'submit',
            
        }
        
    }).then((response) => {

        for (let i = 0; i < box.length; i++) {
                    if (box[i].instructor == response.toLowerCase()) {
                        var x = box[i].pass
                        
                    } else {
                        var x = false
                    
                    }
        }
        if (x == false) {
                    swal({
                        title: 'oops!',
                        icon: 'error',
                        closeOnClickOutside: false,
                        closeOnEsc: false,
                        dangerMode: true,
                        text: "not valid name"
                    })
                    console.log(x);
                } else {
                    passSignInInp.value = x
                    console.log(x);
        
                }
    })
        
    
    
   
    
})

function userNameSignUpInpValid() {
    var regX = /^[A-Z][a-z0-9]{3,15}$/;
    if (regX.test(userNameSignUpInp.value)) {
     
        
        return true;
    } else {

        return false;
        
  }

}
userNameSignUpInp.addEventListener('change',function () {
    if (userNameSignUpInpValid()) {
        errorName.innerHTML = ''
        userNameSignUpInp.classList.remove('is-invalid')
        userNameSignUpInp.classList.add('is-valid')
        console.log('yes');
    } else {
        errorName.innerHTML ='enter your name from 4 to 15 ch starts with capital ch'
        userNameSignUpInp.classList.add('is-invalid')
        console.log('no');
        
    }
})
function passSignUpInpValid() {
    var regX = /^[\w]{6,15}$/;
    if (regX.test(passSignUpInp.value)) {
     
        
       return true;
    } else {
       return false;
       
  }
  
}
passSignUpInp.addEventListener('change',function () {
    if (passSignUpInpValid()) {
        passSignUpInp.classList.remove('is-invalid')
        passSignUpInp.classList.add('is-valid')
        document.querySelector('.passUp').innerHTML =''
    } else {
        passSignUpInp.classList.add('is-invalid')
        document.querySelector('.passUp').innerHTML ='enter password include any latter , numbers and _ from 6 to 15'

    }
})

