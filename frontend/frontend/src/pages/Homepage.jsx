import { Outlet, Link } from "react-router-dom";
import styles from '../design/Homepage.module.css'

const Homepage = () => {
    return(<body className={styles.body}>
        
        <div className={styles.bgimage}>
            <div className={styles.header}>
                <div className={styles.aboutus}>
                    <button className={styles.About} onclick="">
                        About US
                    </button>
                </div>
                <div className={styles.contactus}>
                    <button className={styles.About}>
                        Contact US
                    </button>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.signup} onclick="">
                    <Link to="/signup"><button className={styles.signin}>Sign-UP</button></Link>
                    </div>
                    <div className={styles.login}>
                    <Link to="/login"><button className={styles.signin}>Log-IN</button></Link>
                    </div>
                </div>
            </div>
            <h1>Apollo's Oracle</h1>
            
            <div className={styles.centerbuttons}>
                <Link to="/login"><button className={styles.button}>Create Quiz {">"}{">"}</button></Link>
                <Link to="/login"><button className={styles.button}>New Quiz {">"}{">"}</button></Link>
            </div>
            {/* <img className="left-image" src="/firstfolder\cball.png" alt="Left Image"></img>
            <img className="right-image" src="/firstfolder\cball.png" alt="Right Image"></img> */}
            
        </div>
        






    </body>)
}

export default Homepage;