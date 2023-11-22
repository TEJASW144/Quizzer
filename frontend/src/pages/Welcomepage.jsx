import { Outlet, Link } from "react-router-dom";
import styles from '../design/Homepage.module.css'
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {

    const navigate = useNavigate();
    return(<body className={styles.body}>
        
        <div className={styles.bgimage}>
            <div className={styles.header}>
                <div className={styles.aboutus}>
                    <button className={styles.About}>
                        About US
                    </button>
                </div>
                <div className={styles.contactus}>
                    <button className={styles.About}>
                        Contact US
                    </button>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.signup}>
                    <h2 className={styles.text}>Welcome: {localStorage.getItem('username')}</h2>
                    </div>
                    <div className={styles.login}>
                    <Link to="/"><button className={styles.signin}>Logout</button></Link>
                    </div>
                </div>
            </div>
            <h1 className={styles.h1}>Apollo's Oracle</h1>
            
            <div className={styles.centerbuttons}>
                <Link to="/create-quiz"><button className={styles.button}>Create Quiz {">"}{">"}</button></Link>
                <Link to="/attemptquiz"><button className={styles.button}>New Quiz {">"}{">"}</button></Link>
            </div>
            {/* <img className="left-image" src="/firstfolder\cball.png" alt="Left Image"></img>
            <img className="right-image" src="/firstfolder\cball.png" alt="Right Image"></img> */}
            
        </div>
        






    </body>)
}

export default WelcomePage;