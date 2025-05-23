import React from "react";

const Loader = () => {
  return (
    <div>
      <style>{`
        /* Full screen overlay */
        #loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          background: white;
        }
        /* Centered loader with nested pseudo-elements */
        #loader {
          display: block;
          position: relative;
          left: 50%;
          top: 50%;
          width: 150px;
          height: 150px;
          margin: -75px 0 0 -75px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color:rgb(44, 249, 245);
          animation: spin 2s linear infinite;
        }
        #loader:before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          bottom: 5px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #f9622c;
          animation: spin 3s linear infinite;
        }
        #loader:after {
          content: "";
          position: absolute;
          top: 15px;
          left: 15px;
          right: 15px;
          bottom: 15px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #280300;
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div id="loader-wrapper">
        <div id="loader"></div>
      </div>
      
      
    </div>
  );
};

export default Loader;
