import React from "react";
import socialAuthNp from "social-auth-np";

function Home() {
  const fb_login_option = {
    ...socialAuthNp.getClientSideOauthOption("facebook"),
    client_id: "711237096101342",
    redirect_uri: "http://localhost:3000/facebook_auth_callback",
  };

  const fb_login_url = socialAuthNp.getOauthUrl("facebook", fb_login_option);

  return (
    <div>
      <a target="_blank" rel="noopener noreferrer" href={fb_login_url}>
        <button>Login with facebook</button>
      </a>
    </div>
  );
}

export default Home;
