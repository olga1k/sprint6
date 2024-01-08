import { useModalContext } from "./NewProvider"
export default function HelpPopUp(props) {
    const { modalText, handleClose } = useModalContext();
    return (
        <div className="modal_container" onClick={handleClose}>

<div className="modal">
    
   <div>{modalText}</div>
</div>
</div>
    )
}

