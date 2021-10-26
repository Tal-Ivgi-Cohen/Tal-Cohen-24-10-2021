export const Modal = ({ msg, onCloseModal }) => {

    return (
        <div className="msg-modal">
            <section className="modal-main flex column justify-center align-center">
                {msg}
                <br/>
                <button type="close-modal-button" onClick={onCloseModal}>
                    Close
                </button>
            </section>
        </div>
    );
};