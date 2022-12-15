  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
  import { signInWithPopup,signOut,setPersistence,browserSessionPersistence,onAuthStateChanged,  getAuth,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
  import { doc,addDoc, setDoc,collection, getFirestore, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCSSToxpGuGOBJhNTEmDRkl0E5cYo7Eal4",
    authDomain: "kkc-store.firebaseapp.com",
    projectId: "kkc-store",
    storageBucket: "kkc-store.appspot.com",
    messagingSenderId: "288372056756",
    appId: "1:288372056756:web:990217ec3a78bb9c312de1",
    measurementId: "G-CHCSS7MS07"
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app); 
  const analytics = getAnalytics(app);
  const auth = getAuth();
  export var userrol = 2;

  export const setData = (ID,Nombre, Apellido, Usuario, Nacimiento, Edad, Email, Password, Rol) =>  

  {
    setDoc(doc(db,"usuarios",ID), {Nombre, Apellido, Usuario, Nacimiento, Edad, Email, Password, Rol});
  }
  export function basicSignUp(Nombre, Apellido, Usuario, Nacimiento, Edad, Email, Password, Rol){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        
        console.log("Usuario Registrado con éxito");
        setData(user.uid, Nombre, Apellido, Usuario, Nacimiento, Edad, Email, Password, Rol);
 
      })
      .catch((error) => {
        const errorCode = error.code;
         
        console.log(errorCode);
        const errorMessage = error.message;
      });

  }

  export function basicLogin(email,password)
  {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
        console.log("ANANANASHE");
       
      })
      .catch((error) => {
        
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  export function googleLogin()
  {
    const provider = new GoogleAuthProvider
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth();
    setPersistence(auth,browserSessionPersistence  );
    auth.languageCode = 'it';
    signInWithPopup(auth, provider)
    .then((result) => {
    console.log("NASHEEEEEEEEEEEEEE");
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    var rol = 2;
    if(user.email == "cacacefederico05@gmail.com")
    {
      rol = 0;
    } else rol = 2;
    alert("Se establecieron los permisos correspondientes");
    var usuarioa = user.displayName;
    let arrname = usuarioa.split(' ');
    //addDoc(collection(db,"usuarios"), [arrname[0], arrname[1], user.displayName, " ", " ", user.email, ":v", rol]);
    setData(user.uid,arrname[0], arrname[1], user.displayName," "," ", user.email, "unknown", rol);
    
    

    alert("Se guardaron los datos del usuario en la base de datos");
    console.log(user.displayName);
    alert("Eres un pedazo de nache");
    //window.location.href = "/index.html";
    // ...
  }).catch((error) => {
    
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    console.log(errorMessage);
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    alert("Ocurrio un error");
    // ...
  });



  }

  export const showUsersForOwners = () =>
  {
    const querySnapshot = getDocs(collection(db, "usuarios")).then(querySnapshot =>
      {
        let html = ' ';
        querySnapshot.forEach((doc) =>
        {
          
            
            
              html += `
              <div class = "userlist-item">
                <h3>${doc.data().Email} </h3>
                <p>${doc.data().Nombre} ${doc.data().Apellido} || Rol: ${doc.data().Rol}</p>
                </div>
              `;
        
            
            $('#userlist').html(html);
          

        }
        
        );

      });

  }

  export const showUsers = () => 
  {
    const querySnapshot = getDocs(collection(db, "usuarios")).then(querySnapshot =>
      {
        querySnapshot.forEach((doc) =>
        {
            console.log(doc.data().Nombre);

        }
        
        );

      });
    
    

  }

  export function showNavBar1()
  {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          const email = user.email;
          getDoc(doc(db, "usuarios", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
              
              console.log("VALOR DEL ROL: " + docSnap.data().Rol);
//////////////////////////////////////////////////////////////////////////
              let html2 = ' ';
              let html3 = ' ';
              html2 += `
              <div class = "menuClass">
                <ul class="menu">
                  <li><a href="/index.html">Home</a></li>
                  <li><a href=" #">Us</a></li>
                  <li><a href="/products.html">Products</a>
                  <li><a href="#">Contact</a>
                  <li><a href="#">${docSnap.data().Nombre}</a>
                    <ul>
                      <li><a href="/signup.html">Account</a></li>
                      <li><a href="/logout.html" id="logout">Log out</a></li>
                    </ul>
            
                  </li>
            
                </ul>
              </div>
              `;
            
              html3 += `
                <div class = "menuClass">
                  <ul class="menu">
                    <li><a href="/index.html">Home</a></li>
                    <li><a href=" #">Us</a></li>
                    <li><a href="/products.html">Products</a>
                    <li><a href="#">Contact</a>
                    <li><a href="#">${docSnap.data().Nombre}</a>
                      <ul>
                        <li><a href="/owner.html">Admin panel</a></li>
                        <li><a href="logout.html" id="logout">Log out</a></li>
                      </ul>
            
                    </li>
            
                  </ul>
                </div>
                `;
              
              if(docSnap.data().Rol == 0)
              {
                
                $('#navBar').html(html3);
            
              }else
              {
                
                $('#navBar').html(html2);
              }
              
              
            } else {
              
              console.log("No such document!");
            }
          })
          
        } else {
          let html3 = ' ';
              html3 += `
                <div class = "menuClass">
                  <ul class="menu">
                    <li><a href="/index.html">Home</a></li>
                    <li><a href=" #">Us</a></li>
                    <li><a href="/products.html">Products</a>
                    <li><a href="#">Contact</a>
                    <li><a href="#">Account</a>
                      <ul>
                        <li><a href="/login.html">Log in</a></li>
                        <li><a href="/signup.html" id="Sign Up">Sign Up</a></li>
                      </ul>
            
                    </li>
            
                  </ul>
                </div>
                `;
                $('#navBar').html(html3);
          console.log("this user is not registered");
        }
    /////////////////////////////////////////////////////////////////////////
      });       
    
    
    
    

    }


    auth.onAuthStateChanged(user =>
      {
        if(user)
        {
          console.log("Usuario Registrado");
        }

      })
  

  
      export function logOut()
      {
        const auth = getAuth();
        auth.signOut();
        
        
      }


      