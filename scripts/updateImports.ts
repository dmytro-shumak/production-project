import { Project } from "ts-morph";
const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.(ts|tsx)");

const files = project.getSourceFiles();

const isAbsolute = (value: string) => {
  const layers = ["app", "shared", "widgets", "features", "entities", "pages"];
  return layers.some((layer) => value.startsWith(layer));
};

files.forEach((file) => {
  const importDeclaration = file.getImportDeclarations();
  importDeclaration.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier("@/" + value);
    }
  });
});

project.save();
