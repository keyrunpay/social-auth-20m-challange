import React from "react";
import socialAuthNp from "social-auth-np";
import Axios from "axios";

function FacebookCallback() {
  const code = socialAuthNp.parseUrl(window.location.search).code;
  const [resp, setResp] = React.useState(null);

  const doAuth = async () => {
    try {
      const { data } = await Axios.get(
        "http://localhost:6001/auth/facebook?code=" + code
      );
      setResp(data);
    } catch (err) {
      setResp(err.response.data);
    }
  };

  React.useEffect(() => {
    if (code) {
      doAuth();
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <div>
      Code is {code}
      <br />
      Response is
      {resp && <p>{JSON.stringify(resp)}</p>}
    </div>
  );
}

export default FacebookCallback;
