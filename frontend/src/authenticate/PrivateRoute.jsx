import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://kidzoschool.onrender.com/user/profile", {
          withCredentials: true,
        });

        if (res.status === 200 && res.data?.email) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
  return <div className="text-center mt-8 text-blue-600 text-lg">
  Loading...
</div>

}
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
