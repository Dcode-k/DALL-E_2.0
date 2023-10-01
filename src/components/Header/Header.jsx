import styles from './Header.module.css'
import {Link} from 'react-router-dom'
import {logo} from '../../assets/index'

const Header=()=>{
    return (
        <header className={styles.header}>
            <Link to='/' className={styles.logo}>
            <img src={logo} alt="Open_ai_logo"  />
            </Link>
            <Link to='/create-post' className={styles.createbtn}>
              <button>
                Create
              </button>
            </Link>
        </header>
    )
}

export default Header;