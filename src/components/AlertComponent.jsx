import React from 'react'

function AlertComponent( { setOpenModal, setMessageError,setMessageTittle,setIconSVG}) {

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn"></div>
        <div className="title">
            
          <h2>{setMessageTittle} {setIconSVG}</h2>
        </div>
        <div className="titleCloseBtn">
        </div>
        <div >
          <p className="text-alert"> {setMessageError} !</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertComponent