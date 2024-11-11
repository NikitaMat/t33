import { useState} from 'react';
import { api } from "~/trpc/server"; 

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const handleUserSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userId) {
        setError("Bitte geben Sie eine gültige Benutzer-ID ein.");
        return;
      }
      // tRPC-Aufruf, um Benutzerdaten abzurufen
      const data = await api.user.getUserData({ userId });
      setUserData(data);
      setError(null); // Setze Fehler zurück, falls der Aufruf erfolgreich war

    } catch (error) {
      console.error("Fehler beim Abrufen der Benutzerdaten:", error);
      setError("Die Benutzerdaten konnten nicht abgerufen werden. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div>
      <h1>Benutzerdaten abfragen</h1>
      <form onSubmit={handleUserSearch}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Benutzer-ID eingeben"
        />
        <button type="submit">Suche</button>
      </form>

      {userData && (
        <div>
          <h2>Benutzerinformationen</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}



