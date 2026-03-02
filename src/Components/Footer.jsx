import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-title">Memory Portal</p>

                <div className="footer-divider"></div>

                <p className="footer-text">
                    Built with React & Bootstrap · Rick and Morty API
                </p>

                <p className="footer-copy">
                    © {new Date().getFullYear()} Marco Novas Medina
                </p>
            </div>
        </footer>
    );
}