import { useAuth } from "../contexts/AuthContext";

export default function Inicio() {
  const { logout } = useAuth();

  const handleClick = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={handleClick}>Log out</button>;
}
