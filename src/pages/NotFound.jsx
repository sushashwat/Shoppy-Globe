import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate()
    const location = useLocation()

    return(
         <div className="notfound-page">
      <div className="notfound-code">404</div>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-msg">The page you're looking for doesn't exist.</p>

      <div className="notfound-details">
        <p><strong>Error:</strong> 404 Not Found</p>
        <p><strong>Requested path:</strong> <code>{location.pathname}</code></p>
      </div>

      <div className="notfound-actions">
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          ← Go Home
        </button>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  )
}
    

export default NotFound