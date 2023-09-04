import "./App.css";
import { useState } from "react";
import Tesseract from "tesseract.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref,child,get } from "firebase/database";
var ten=0;
function App() {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("eng");
  const [result, setResult] = useState("");
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    handleFileSelect(e)
  };
  function handleFileSelect(e) {
    var input = e.target;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output-photo');
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  let flag=false;
  const processImage = () => {
    setResult("");
    setProgress(0);
    Tesseract.recognize(file, language, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(m.progress);
        }
      },
    }).then(({ data: { text } }) => {
      setResult(text);
      var arr=["Hall Ticket No : ","HTNo: ","Hall Ticket No: "];
      for(var i=0;i<arr.length;i++){
      if(text.includes(arr[i])){
        flag=true
        let index = text.indexOf(arr[i]);
        ten = text.substring(index + arr[i].length, index + arr[i].length + 10);
        console.log(ten);
        window.alert("Document Found in our College Records");
        Read(ten)
       
      }
  
  }
  if (flag===false){
    window.alert("Document not Found in our College Records",ten);
  window.location="App.js"
  }
    });
  };
  return (
    <div>
      {/* <h1 style="text-align: center;">Certificate Verification</h1> */}
      <h1 class="center">Certificate Verification</h1>
    <div className="App">
      
        <div className="aa">
          <div className="ab">
      <div className="bb">
      <input type="file" id="input-photo" name="input-photo" onChange={onFileChange} />
      <div style={{ marginTop: 25 }}>
        <input type="button" value="Submit" onClick={processImage} />
      </div>
      <div className="process">
        <progress value={progress} max={1} />
      </div>
      </div>
      <div id="cc">
      </div>
      </div>
      <div className="sizee">
        <img id="output-photo"></img>
      </div>
      </div>
    </div>
    </div>
  );
}
export default App;



function Read(x){
const firebaseConfig = {
  apiKey: "AIzaSyD1DAUdqHRogz_wQ2gZFg-jmuKC1RmFSRQ",
  authDomain: "fir-8ec59.firebaseapp.com",
  databaseURL: "https://fir-8ec59-default-rtdb.firebaseio.com",
  projectId: "fir-8ec59",
  storageBucket: "fir-8ec59.appspot.com",
  messagingSenderId: "474822688551",
  appId: "1:474822688551:web:a778784063dc30e4917302",
  measurementId: "G-N5QX5C43VY"
};
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));
get(child(dbRef,x)).then((snapshot) => {
  if (snapshot.exists()) {
  var name=document.getElementById("cc");

  name.innerHTML="Hall Ticket No : "+ten+"<br>"+"Name : "+snapshot.val().Name+"<br>"+"Serial No : "+snapshot.val().Serial_No
  +"<br>"+"College : "+snapshot.val().College;
  } else {
    window.alert("Document not Found in our College Records");
  }
}).catch((error) => {
  console.error(error);
});
}