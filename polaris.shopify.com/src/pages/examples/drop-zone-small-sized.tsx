import { DropZone } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function DropZoneExample() {
  return (
    <div style={{ width: 50, height: 50 }}>
      <DropZone>
        <DropZone.FileUpload />
      </DropZone>
    </div>
  );
}

export default withPolarisExample(DropZoneExample);
