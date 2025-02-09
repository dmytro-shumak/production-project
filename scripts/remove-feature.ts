import { JsxAttribute, Node, Project, SyntaxKind } from "ts-morph";
const project = new Project({});

const toggleFunctionName = "toggleFeatures";
const toggleFunctionComponent = "ToggleFeatures";

const removeFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off/on

if (!removeFeatureName || !featureState) {
  throw new Error("Please provide the feature name and state");
}

if (featureState !== "on" && featureState !== "off") {
  throw new Error("Please provide the feature state as on or off");
}

project.addSourceFilesAtPaths("src/**/*.(ts|tsx)");

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
  let isToggle = false;
  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier)) {
      if (child.getText() === toggleFunctionName) {
        isToggle = true;
      }
    }
  });

  return isToggle;
};

const isToggleComponent = (node: Node) => {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleFunctionComponent;
};

const replaceToggleFunction = (node: Node) => {
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

  if (!objectOptions) {
    return;
  }
  const onFunctionProperty = objectOptions.getProperty("on");
  const offFunctionProperty = objectOptions.getProperty("off");
  const featureNameProperty = objectOptions.getProperty("name");

  const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

  if (featureName !== removeFeatureName) {
    return;
  }

  if (featureState === "on") {
    node.replaceWithText(onFunction?.getBody?.()?.getText() ?? "");
  }

  if (featureState === "off") {
    node.replaceWithText(offFunction?.getBody?.()?.getText() ?? "");
  }
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
  return jsxAttributes.find((node) => node.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();

  if (value?.startsWith("(")) {
    return value.slice(1, -1);
  }

  return value;
};

const replaceComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, "on");
  const offAttribute = getAttributeNodeByName(attributes, "off");

  const featureNameAttribute = getAttributeNodeByName(attributes, "featureName");
  const featureName = featureNameAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText()?.slice(1, -1);

  if (featureName !== removeFeatureName) return;

  const offValue = getReplacedComponent(offAttribute);
  const onValue = getReplacedComponent(onAttribute);

  if (featureState === "on" && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === "off" && offValue) {
    node.replaceWithText(offValue === "null" ? "" : offValue);
  }
};

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      return replaceToggleFunction(node);
    }

    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      return replaceComponent(node);
    }
  });
});

project.save();
