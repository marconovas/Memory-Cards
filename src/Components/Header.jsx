import "./Header.css"

export default function Header () {
    return(
        <div className="text-center my-4">
            <h1 className="title fw-bold">Memory Portal</h1>
            <h4>Match the characters across Dimensions</h4>
            <p className="subtitle text-light">
                Don't click the same character twice!!
            </p>
        </div>
    );
}