import { PlayIcon } from '../PlayIcon'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <PlayIcon />
                <nav>
                    <a href='/'>What's in</a>
                </nav>
            </div>
        </header>
    )
}
