import React from 'react';
import gif from "./assets/images/loading.gif";

import styles from "./styles/Loading.module.css"

const Loading = () => {
  return (
    <div>
        <img src={gif} alt="loading" className={styles.loadingGif}></img>
    </div>
  )
}

export default Loading