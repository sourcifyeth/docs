import * as React from "react";
import "./SwaggerContainer.module.css";

const SwaggerContainer = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading Swagger UI...</div>;
  }

  // Only import and render SwaggerUI on the client side
  const SwaggerUI = require("swagger-ui-react").default;
  require("swagger-ui-react/swagger-ui.css");

  return <SwaggerUI url="https://sourcify.dev/server/api-docs/swagger.json" docExpansion="list" deepLinking={true} />;
};

export default SwaggerContainer;
