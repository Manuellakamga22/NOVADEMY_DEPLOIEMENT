function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}

export default LogoutButton;