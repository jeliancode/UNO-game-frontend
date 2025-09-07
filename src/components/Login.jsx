import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { formData, handleChange, handleSubmit, navigate, error } = useLogin();

  return (
    <div className="app-container">
      <div className="title-container">
        <h1>UNO</h1>
        <p className="or-text">or:</p>
        <button className="nav-button" onClick={() => navigate("/signup")}>
          Sign-up
        </button>
      </div>
      <div className="form-container">
        <div className="signup-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
