

const LoginChecker = () => {

    if (!window.localStorage.getItem("accessToken")) {
        // navigate("/login")
        window.location.href = `/login`
    }
}

export default LoginChecker