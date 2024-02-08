import * as React from 'react';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import './SwaggerContainer.module.css'

const SwaggerContainer = () => {
  return (
    <SwaggerUI url="https://sourcify.dev/server/api-docs/swagger.json" docExpansion="list" deepLinking={true} />
  );
}

export default SwaggerContainer;

