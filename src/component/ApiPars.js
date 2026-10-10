import "./ApiPars.css";
import { useEffect, useState, Fragment } from "react";
function ApiPars() {
  const apiUrl = "https://jsonplaceholder.typicode.com/users/";

  const [apiData, setApiData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data);
        setError(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const filteredUsers = apiData.filter((user) =>
    `${user.name} ${user.email} ${user.username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  console.log(1);

  return (
    <div className="api-parser">
      {error && <p className="api-error">Не вдалося завантажити дані</p>}
      <div className="table-container">
        <header className="api-header">
          <img
            className="database-icon"
            src="/icons/database.svg"
            alt="API Icon"
          />
          <div className="api-header-content">
            <div>
              <h1>API Parser</h1>
              <p className="api-description">Дані з JSONPlaceholder</p>
            </div>
            <div className="api-search">
              <img
                className="search-icon"
                src="/icons/search.svg"
                alt="Search Icon"
              />
              <input
                className="api-search-input"
                type="text"
                placeholder="Пошук користувача..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>
        <table className="api-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Fragment key={user.id}>
                  <tr
                    onClick={() =>
                      setSelectedUser(selectedUser === user.id ? null : user.id)
                    }
                    className={selectedUser === user.id ? "active" : null}
                  >
                    <td>
                      {user.id}{" "}
                      <span
                        className={
                          selectedUser === user.id ? "td-top" : "td-bottom"
                        }
                      >
                        {selectedUser === user.id ? "▲" : "▼"}
                      </span>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                  </tr>
                  {selectedUser === user.id && (
                    <tr key={`${user.id}-details`}>
                      <td colSpan="4" className="user-details">
                        <div className="user-container">
                          <div className="user-header">
                            <div className="user-info">
                              <img
                                className="user-avatar"
                                src={`https://i.pravatar.cc/150?img=${user.id}`}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = "/icons/user.svg";
                                }}
                                alt={user.name}
                              />
                              <div className="user-name">
                                <h3>{user.name}</h3>
                                <p>
                                  ID: <span>{user.id}</span>
                                </p>
                                <p className="username">
                                  Username: <span>{user.username}</span>{" "}
                                </p>
                              </div>
                            </div>
                            <div className="user-contact">
                              <div>
                                <img
                                  className="contact-icon"
                                  src="/icons/email.svg"
                                  alt="email"
                                />
                                <p>
                                  Email: <br />
                                  {user.email}
                                </p>
                              </div>
                              <div>
                                <img
                                  className="contact-icon"
                                  src="/icons/telephone.svg"
                                  alt="Telephone"
                                />
                                <p>
                                  Phone: <br /> {user.phone}
                                </p>
                              </div>

                              <div>
                                <img
                                  className="contact-icon"
                                  src="/icons/internet.svg"
                                  alt="Internet"
                                />
                                <p>
                                  Website: <br />
                                  <a
                                    className="user-website-link"
                                    href={user.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {user.website}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="user-details-container">
                            <div className="user-details-card">
                              <h2>
                                {" "}
                                <img
                                  className="details-icon"
                                  src="/icons/address.svg"
                                  alt="Address"
                                />{" "}
                                Address
                              </h2>
                              <div className="details-row-container">
                                <div className="details-row">
                                  <span className="detail-label">Street: </span>
                                  <span>{user.address.street}</span>
                                </div>
                                <div className="details-row">
                                  <span className="detail-label">Suite: </span>
                                  <span className="detail-value">
                                    {user.address.suite}
                                  </span>
                                </div>
                                <div className="details-row">
                                  <span className="detail-label">City: </span>
                                  <span className="detail-value">
                                    {user.address.city}
                                  </span>
                                </div>
                                <div className="details-row">
                                  <span className="detail-label">
                                    Zipcode:{" "}
                                  </span>
                                  <span className="detail-value">
                                    {user.address.zipcode}
                                  </span>
                                </div>
                                <div className="details-row">
                                  <span className="detail-label">Geo: </span>
                                  <span className="detail-value">
                                    Lat: {user.address.geo.lat}, Lng:{" "}
                                    {user.address.geo.lng}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="user-details-card">
                              <h2>
                                {" "}
                                <img
                                  className="details-icon"
                                  src="/icons/building.svg"
                                  alt="Building"
                                />{" "}
                                Company
                              </h2>
                              <div className="details-row-container">
                                <div className="details-row">
                                  <span className="detail-label">Name: </span>
                                  <span>{user.company.name}</span>
                                </div>
                                <div className="details-row">
                                  <span className="detail-label">
                                    Catch Phrase:{" "}
                                  </span>
                                  <span className="detail-value">
                                    {user.company.catchPhrase}
                                  </span>
                                </div>
                                <div className="details-row">
                                  <span className="detail-label">BS: </span>
                                  <span className="detail-value">
                                    {user.company.bs}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">
                  Користувачів не знайдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApiPars;
