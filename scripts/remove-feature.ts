import { Node, Project, SyntaxKind } from "ts-morph";
const project = new Project({});

const removeFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off/on

if(!removeFeatureName || !featureState) {
  throw new Error('Please provide the feature name and state');
}

if(featureState !== 'on' && featureState !== 'off') {
  throw new Error('Please provide the feature state as on or off');
}


project.addSourceFilesAtPaths("src/**/*.(ts|tsx)");

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
  let isToggle = false;
  node.forEachChild((child) => {
    if(child.isKind(SyntaxKind.Identifier)) {
      if(child.getText() === "toggleFeatures") {
        isToggle = true;
      }
    }
  })

  return isToggle;
}

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if(node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

      if(!objectOptions) {
        return;
      }
      const onFunctionProperty = objectOptions.getProperty('on');
      const offFunctionProperty = objectOptions.getProperty('off');
      const featureNameProperty = objectOptions.getProperty('name');

      const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

      if(featureName !== removeFeatureName) {
        return;
      }

      if(featureState === 'on') {
        node.replaceWithText(onFunction?.getBody?.()?.getText() ?? '');
      }

      if(featureState === 'off') {
        node.replaceWithText(offFunction?.getBody?.()?.getText() ?? '');
      }

    }
  })
});

project.save();
