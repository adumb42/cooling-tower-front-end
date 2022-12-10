import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import "./styles/modal.css"

const Modal = props => {
    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300}}
        >
        
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <h4 className="modal__title">{props.title}</h4>
                </div>
                <div className="modal__body">{props.children}</div>
                <div className="modal__footer">
                    <button onClick={props.onSubmit} className="sub__button">{props.buttoncaption}</button>
                </div>
            </div>
        </div>
        </CSSTransition>,
        document.getElementById('root')
    )
}

export default Modal;