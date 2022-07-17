import React, {FC, useState} from 'react'
import './styles.css'

type AddIssueModalPropTypes = {
    isOpen: boolean,
    handleAddIssue: (title: string, body: string) => void;
    onClose: () => void
}

const AddIssueModal:FC<AddIssueModalPropTypes> = ({isOpen, onClose, handleAddIssue}) =>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')


    return (
        <div className='modal-body'>
            <h2>Add Issue</h2>
            <div className='modal-input'>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='modal-input'>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    wrap="hard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className='modal-button-container'>
                    <button className='close-button' onClick={onClose}>Close</button>
                    <button className='add-new-button' disabled={!title} onClick={() => handleAddIssue(title,description)}>Add Issue</button>
                </div>
            </div>
        </div>
    )
}

export default AddIssueModal;
