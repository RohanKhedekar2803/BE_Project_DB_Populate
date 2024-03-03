import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';


function App() {

  const fileInputRef = useRef(null);

  const fun=(wordsArray)=>{
    const apiUrl = 'http://localhost:8089/repo/save';

const requestBody = {

    "name": wordsArray[0],
    "description": wordsArray[1],
    "url": wordsArray[2],
    "createdAt": wordsArray[3],
    "homepage": wordsArray[5],
    "size": wordsArray[6],
    "stars": wordsArray[7],
    "forks": wordsArray[8],
    "language": wordsArray[10],
    "topics": wordsArray[11]
  
  
};

// Convert the JavaScript object to JSON string
const jsonBody = JSON.stringify(requestBody);

// Make the API call using fetch
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: jsonBody,
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('API response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  }

  const buttonStyle = {
    width: '100px',  // Specify the desired width
    height: '50px', // Specify the desired height
    // Add other styles if needed
    backgroundColor: 'blue',
    color: 'white',
    // ... other styles
  };


  function isValidString(inputString) {
    // Define a regular expression pattern for valid characters
    const chineseRegex = /[\u4e00-\u9fa5]/;

    // Test the input string against the pattern
    return chineseRegex.test(inputString);
}

const read = async () => {
  const files = fileInputRef.current.files;

  if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();

          await new Promise(resolve => setTimeout(resolve, 10)); // 10 milliseconds delay

          reader.onload = function (e) {
              const contents = e.target.result;
              const lines = contents.split('\n');
              lines.map(line => {
                  const wordsArray = line.split(/,(?![^\[]*\])/);
                  if (wordsArray.length > 0 && wordsArray.length == 12) {
                      fun(wordsArray);
                      // console.log('Line from the CSV file:', wordsArray);
                  } else {
                      console.error('Invalid line in the CSV file:', line);
                  }
              });
          };

          reader.readAsText(file);
      }
  } else {
      console.error('No files selected.');
  }
};


  return (
    <div className="App">

      <button style={buttonStyle} onClick={fun}>
        Click Me
      </button>

      <input type="file" ref={fileInputRef} />
      <button style={buttonStyle} onClick={read}>
        Read CSV and Print First Line
      </button>

    </div>
  );
}

export default App;
