import CloseIcon from '@material-ui/icons/Close';

export const MsgModal = ({ msg, onCloseModal }) => {

    return (
        <div className="msg-modal">
            <section className="modal-main flex column justify-center align-center">
                {msg}
                <br/>
                <button type="close-modal-button" onClick={onCloseModal}>
                   <CloseIcon />
                </button>
            </section>
        </div>
    );
};