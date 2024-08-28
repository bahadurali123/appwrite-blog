import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authatication = true }) {
    const navigate = useNavigate();
    const [loding, setLoding] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authatication && (authStatus !== authatication)) {
            navigate("/login");
            // console.log("Login false")
        } else if (!authatication && (authStatus !== authatication)) {
            // console.log("Login true", children)
            navigate("/");
        }
        setLoding(false);
    }, [authStatus, navigate, authatication])
    return !loding ? <>{children}</> : <h1>Loding...</h1>;
}

export default Protected;