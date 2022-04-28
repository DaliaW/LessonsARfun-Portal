import React from "react";
import { Helmet } from "react-helmet";

const TogetherJS = () => {
  return (
    <div>
      <Helmet>
        <script>
          TogetherJSConfig_hubBase = "https://togetherjs-hub.glitch.me/"
        </script>
        <script>TogetherJSConfig_autoStart = true</script>
        <script>TogetherJSConfig_suppressJoinConfirmation = true</script>
        <script src="https://togetherjs.com/togetherjs-min.js"></script>
      </Helmet>
    </div>
  );
};

export default TogetherJS;
