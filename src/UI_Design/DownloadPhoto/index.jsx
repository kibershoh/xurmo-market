import React, { useRef } from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import styles from './styles.module.scss'
const DownloadPhoto = ({ setFileUrl }) => {
    const fileInputRef = useRef(null);
    const actives = () => {
        fileInputRef.current.click();
    };
    return (
        <div className={styles.file_input}>
            <div className={styles.choose_file} onClick={actives}>
                <MdAddAPhoto size={25} className={styles.camera} />
                <span>Download Photo</span>
            </div>
            <input ref={fileInputRef}
                onChange={(e) => {
                    setFileUrl(e.target.files[0])
                }}
                type='file'
            />

        </div>
    )
}

export default DownloadPhoto